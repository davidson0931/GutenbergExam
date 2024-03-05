<?php
use WordPress\Block as Block;

if( ! defined( 'ABSPATH' ) ) exit; 

// function boilerplate_load_assets() {
//   wp_enqueue_script('ourmainjs', get_theme_file_uri('/build/index.js'), array('wp-element'), '1.0', true);
//   wp_enqueue_style('ourmaincss', get_theme_file_uri('/build/index.css'));
// }

// add_action('wp_enqueue_scripts', 'boilerplate_load_assets');

function boilerplate_add_support() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
}

add_action('after_setup_theme', 'boilerplate_add_support');

add_action( 'after_setup_theme', 'tt1_block_parts_setup' );

function tt1_block_parts_setup() {
    add_theme_support( 'block-template-parts' );
}

// Exit if accessed directly

class BradsBoilerplate {
  function __construct() {
    add_action('init', array($this, 'onInit'));
  }

  function onInit() {

    wp_register_script('makeUpANameHereScript', get_theme_file_uri('/build/index.js'),
     array('wp-blocks', 'wp-element', 'wp-editor'));
    wp_register_style('makeUpANameHereStyle', get_theme_file_uri('/build/index.css'));

    $myData = array(
      'sampleKey' => 'Sample Value',
      'anotherKey' => array( 'data1', 'data2' ),
    );
    wp_localize_script( 'makeUpANameHereScript', 'myLocalizedData', $myData );

    register_block_type('makeupnamespace/make-up-block-name', array(
      
     'render_callback' => array($this, 'renderCallback'),
      'editor_script' => 'makeUpANameHereScript',
      'editor_style' => 'makeUpANameHereStyle'
    ));

    
  }

  function renderCallback($attributes) {
    if (!is_admin()) {
      // wp_enqueue_script('boilerplateFrontendScript', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'));
      // wp_enqueue_style('boilerplateFrontendStyles', plugin_dir_url(__FILE__) . 'build/frontend.css');
        wp_enqueue_script('ourmainjs', get_theme_file_uri('/build/index.js'), array('wp-element'), '1.0', true);
        wp_enqueue_style('ourmaincss', get_theme_file_uri('/build/index.css'));
    }

    // $hero_title = get_post_meta( $post_id, $meta_key, true );

  
  
  //  exit;
    ob_start(); 
  
    ?>
<?php// echo htmlspecialchars(wp_json_encode($attributes , JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) )?>
    <div class="boilerplate-update-me">
   
      <pre style="display;"><?php echo htmlspecialchars(wp_json_encode($attributes , JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)) ?></pre>
    </div>
    <?php return ob_get_clean();
    
  }

  function renderCallbackBasic($attributes) {
    return 'fasdfs <div class="boilerplate-frontend">Hello, the sky is ' . $attributes['skyColor'] . ' and the grass is ' . $attributes['grassColor'] . '.</div>';
  }
}

$bradsBoilerplate = new BradsBoilerplate();

function my_wp_nav_menu_objects($objects, $args) {
  foreach($objects as $key => $item) {
      $objects[$key]->classes[] = 'my-class';
  }
  return $objects;
}
add_filter('wp_nav_menu_objects', 'my_wp_nav_menu_objects', 10, 2);

// In your PHP code (functions.php or a custom plugin)
add_action( 'init', function() {
  register_meta( 'post', 'your_meta_key', array(
    'type' => 'string',
    'single' => true,
    'show_in_rest' => false, // Not required for this approach
  ) );
} );

// When saving the ACF field, update the corresponding meta field
add_action( 'acf/save_post', function( $post_id ) {
  $acf_field_value = get_field( 'your_acf_field', $post_id );
  update_post_meta( $post_id, 'your_meta_key', $acf_field_value );
}, 10, 2 );



add_action( 'rest_api_init', function () {
  register_rest_route( 'wp/v2', '/posts/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'get_hero_title_meta',
    'permission_callback' => '__return_true', // Adjust permissions as needed
  ) );
} );

function get_hero_title_meta( WP_REST_Request $request ) {
  $post_id = (int) $request->get_param( 'id' );
  $meta_key =  (string) $request->get_param( 'meta' );

  if ( ! $post_id ) {
    return new WP_Error( 'rest_post_invalid_iddasdf', 'Invalid post ID provided.', array( 'status' => 400 ) );
  }

  // Check if "hero_title" meta field is accessible
  if ( ! metadata_exists( 'post', $post_id, 'hero_title' ) ) {
    return new WP_Error( 'rest_meta_data_not_found', 'Meta data not found for this post.', array( 'status' => 404 ) );
  }

  $hero_title = get_post_meta( $post_id, $meta_key, true );

  return array(
    "value" => $hero_title,
  );
}