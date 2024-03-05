import './styles/main.scss'
// import Person from './scripts/Person'
// import ExampleReactComponent from './scripts/ExampleReactComponent'
import {useMediaQuery} from './scripts/useMediaQuery';

import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { registerBlockType } from '@wordpress/blocks';
// import { useSelect } from '@wordpress/data';
import { useSelect } from '@wordpress/block-editor';
import Button from 'react-bootstrap/Button';
// import "./index.scss"
import classNames from 'classnames';
/* 
console.log(post_id);
console.log(getCurrentPostId);
 */


async function fetchMetaData(postId, metaKey) {
  const response = await fetch(`/wp-json/wp/v2/posts/${postId}?meta=${metaKey}`);
  const data = await response.json();
  return data.value; // Access the meta value
}
async function fetchImage(imageId) {
  const response = await fetch(`/wp-json/wp/v2/media/${imageId}`);
  const data = await response.json();
  return data; // Access the meta value
}

if(wp?.blocks?.registerBlockType  !== undefined){
    
    wp.blocks.registerBlockType("makeupnamespace/make-up-block-name", {
        title: "Hero Boilerplate Block",
        icon: "welcome-learn-more",
        category: "common",
        attributes: {
          skyColor: { type: "string" },
          grassColor: { type: "string"  ,default: "how",},
          heroTitle: { type: "string"  ,default: null,},
          heroDecription: { type: "string"  ,default: null,},
          heroButtonTitle: { type: "string"  ,default: null,},
          herobackImage: { type: "string"  ,default: null,},
          heroButtonURL: { type: "string"  ,default: null,},
          heroPersonModelImage: { type: "string"  ,default: null,}
        },
        edit: EditComponent,
        save: function () {
        return null
        }
  })
  
  function EditComponent(props) {
    const { sampleData } = props.attributes;
    // const blockProps = useBlockProps((select) => {
    //   console.log(select ,"selectselectselect");
    // });
    const [postId, setPostId] = useState(null);
    const [heroTitle, setHeroTitle] = useState(null);
    const [heroDecription, setDecription] = useState(null);
    const [heroButtonTitle, setButtonTitle] = useState(null);
    const [heroButtonURL, setButtonURL] = useState(null);
    const [herobackImage, setBackImage] = useState(null);
    const [heroPersonModelImage, setPersonModelImage] = useState(null);

    useEffect(() => {
      const { getCurrentPostId } = wp.data.select("core/editor");
      const post_id = getCurrentPostId();
      setPostId(post_id);


      const fetchData = async () => {
        const hero_title = await fetchMetaData(post_id, 'hero_title'); // Replace with your meta key
        const hero_desc = await fetchMetaData(post_id, 'hero_description'); // Replace with your meta key
        const hero_button_title = await fetchMetaData(post_id, 'button_title'); // Replace with your meta key
        const hero_button_url = await fetchMetaData(post_id, 'button_url'); // Replace with your meta key
        const hero_back_id = await fetchMetaData(post_id, 'hero_background'); // Replace with your meta key
        const person_model_image_id = await fetchMetaData(post_id, 'person_model_image'); // Replace with your meta key
     
        // console.log(metaData);

        const hero_back_image = await fetchImage(hero_back_id); 
        const person_model_image = await fetchImage(person_model_image_id); 
        console.log(hero_back_image);


       

        setHeroTitle((hero_title).replace(/<br>/g, "<br/>"));
        setDecription(hero_desc);
        setButtonTitle(hero_button_title);
        setBackImage(hero_back_image.source_url);
        setButtonURL(hero_button_url);
        setPersonModelImage(person_model_image.source_url);


        props.setAttributes({ "heroTitle": hero_title})
        props.setAttributes({ "heroDecription": hero_desc});
        props.setAttributes({ "heroButtonTitle": hero_button_title});
        props.setAttributes({ "herobackImage": hero_back_image.source_url});
        props.setAttributes({ "heroButtonURL": hero_button_url});
        props.setAttributes({ "heroPersonModelImage": person_model_image.source_url});
      };

      fetchData();



    }, [setPostId]);
  

    
   /*  function updateSkyColor(e) {
      console.log(posts ,"POPOPOST");
  //   console.log( useBlockProps((select) => select('core/block-editor')));
    //  console.log(postId ,"postId");
      props.setAttributes({ skyColor: e.target.value})
    }
  
    function updatesampleDataColor(e) {
      props.setAttributes({ sampleData:e.target.value })
    }
     */
    return (
      <div className="makeUpYourBlockTypeName">
        {/* <input type="text" value={props.attributes.skyColor} onChange={updateSkyColor} placeholder="sky color..." /> */}
      

        <div className="w-100" style={{backgroundImage : `url(${herobackImage})` , height : "100vh" , backgroundRepeat: "no-repeat"}}>
          
          <div className="container">
              <div className="row">
                <div className="col-7 d-flex  " style={{height : "100vh" }}>
                  <div className="row align-self-center "  style={{position : "relative" , top: "-12%"}}>
                    <div className="col-12">
                         <h1 className='HeroTitle' dangerouslySetInnerHTML={{ __html: heroTitle }}/>
                    </div>
                    <div className="col-10 pt-2">
                         <p className='HeroDesc' dangerouslySetInnerHTML={{ __html: heroDecription }}/>
                    </div>
                    <div className="col-6 pt-2">
                         <Button className="btn-primary">{heroButtonTitle}</Button>
                    </div>
                   
                  </div>
                </div>
                <div className="col-5 d-flex align-items-end">
                  <div className="col-12">
                      <div className="row"  >
                        <div className="heroPersonModelImage" >
                        
                          <img  src={heroPersonModelImage} style={{position : "absolute" , left: "-78px" ,bottom: "0px" , maxHeight: "700px", /* , height : "99vh" , minWidth :  "46vw" */}} />
                        
                        </div>
                      </div>
                  </div>
                </div>
                
              </div>
          </div>
        </div>
      
      </div>
    )
  }
}


// const person1 = new Person("Brad")
// ReactDOM.render(<ExampleReactComponent />, document.querySelector("#render-react-example-here"))

// console.log("fasdf");
const divsToUpdate = document.querySelectorAll(".boilerplate-update-me")





 
divsToUpdate.forEach(div => {
    const data = JSON.parse(div.querySelector("pre").innerText)
    
    const root = ReactDOM.createRoot(div);

    // root.render(<OurComponent {...data} />, div)

    root.render(

     

        <OurComponent {...data} />
     );
    

    div.classList.remove("boilerplate-update-me")
  })
  
  function OurComponent(props) {
    const [showSkyColor, setShowSkyColor] = useState(false)
    const [showGrassColor, setShowGrassColor] = useState(false)
    // const [matches, setMatches] = useState(false);
    const matches640px = useMediaQuery('sm');

    const FirstColClassName = classNames({
      'col-7': matches640px,
      'd-flex': matches640px,
      'col-12': !matches640px
    });
    const secondColClassName = classNames({
      'col-5': matches640px,
      'd-flex': matches640px,
      'align-items-end': matches640px,
      'col-12': !matches640px
    });
   
 
    // 1. Fix the HTML string by adding a closing slash
    const fixedHeroTitle = (props.heroTitle).replace(/<br>/g, "<br/>");
    return (
      <div className="boilerplate-frontend">
       
      
        <div className="w-100" style={{backgroundImage : `url(${props.herobackImage})` , height : !matches640px ? "auto" : "100vh" , backgroundRepeat: "no-repeat"}}>
          
          <div className="container">
              <div className="row">

                {matches640px }
                <div className={FirstColClassName} style={{height :  !matches640px ? "auto" : "100vh"}}>
                  <div className="row align-self-center "  style={{position : "relative" , top: "-12%"}}>
                    <div className="col-12">
                         <h1 className='HeroTitle' dangerouslySetInnerHTML={{ __html: fixedHeroTitle }}/>
                    </div>
                    <div className="col-10 pt-2">
                         <p className='HeroDesc' dangerouslySetInnerHTML={{ __html: props.heroDecription }}/>
                    </div>
                    <div className="col-6 pt-2">
                         <Button className="btn-primary">{props.heroButtonTitle}</Button>
                    </div>
                   
                  </div>
                </div>
                <div className={secondColClassName}>
                  <div className="col-12">
                      <div className="row"  >
                        <div className="heroPersonModelImage" >

                          <img  src={props.heroPersonModelImage} style={{position :  !matches640px ? "" : "absolute" , left: "-78px" ,bottom: "0px" , maxHeight:   !matches640px ? "540px" : "700px", /* , height : "99vh" , minWidth :  "46vw" */}} />
                        
                        </div>
                      </div>
                  </div>
                </div>
                
              </div>
          </div>
        </div>
     {/*  <section class="hero">
          <div class="hero-content">
          <h1>{props.heroTitle}</h1> 
          <p>{props.heroDecription}</p>
          <a href={props.heroButtonURL} class="btn btn-primary">{props.heroButtonTitle}</a>
          </div>
          <div class="hero-image">
          <img src={props.herobackImage} alt="Image Description"/>
          </div>
      </section> */}
 
       {/*  <p>
          <button onClick={() => setShowSkyColor(prev => !prev)}>Toggle view sky color</button>
          {showSkyColor && <span>{props.skyColor}</span>}
        </p>
        <p>
          <button onClick={() => setShowGrassColor(prev => !prev)}>Toggle view grass color</button>
          {showGrassColor && <span>{props.grassColor}</span>}
        </p> */}
      </div>
    )
  }
  