<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'GutenbergExam' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '7v:g-9UowoY,5l@[;Uyly0beRX!%15AfLFFZ7!c:=GPMsEvCLr?Qw&HxQj$h.io:' );
define( 'SECURE_AUTH_KEY',  'K0*2AN39YAZ2X3xz_A${OVK2VL fkI&$W$s]20W0E; :(OnL3WjkC$;9c(lIyAvC' );
define( 'LOGGED_IN_KEY',    'xj3W]|mC4s;=IIbaZ=;F5*>+)5YqMZDdr:.ooC6H0#L+&24~A6>X)] S6_Sh}~3{' );
define( 'NONCE_KEY',        'c`D@zHCivoyW#GTLj7>Y/5]4sY/LeW./y~`6eq&P~QJ6D@3QJCKF_-L?/]jk+fEe' );
define( 'AUTH_SALT',        'Qa[&E}]yBw:v-qy7`$:[F(cc#~oHPYc7$csEBgusA=FT`$r5=cZ6Y+h ?&LWN`_J' );
define( 'SECURE_AUTH_SALT', 'bo{vb{lKK|fsB$BpjYf+~aag{HLWaa-vo}`XS!H/:]0 6Ejj|n:dF7fy/oIDMo#R' );
define( 'LOGGED_IN_SALT',   '|YR&F^)uJpSN~rP%`?Cb<3F0*z7F(Q`y)k!<`7O_x!91SES/)hhA<$A*sG]-H?fc' );
define( 'NONCE_SALT',       '2]$U:xpg_UpiE_JC=%?M;pQaYHKyJ%:@.mBOM_3/MnW^l+]&x^G4(jmYb!PPUs{g' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
