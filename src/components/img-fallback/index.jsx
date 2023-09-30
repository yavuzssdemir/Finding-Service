export default function ImgFallback(props) {
    
  
    return (
      <img
        src={props.src}
        style={props.style}
        className={props.className}
        onError={(e) => {
          
  
          console.log("Şu resim yüklenemedi: ", props.src);
         
          e.target.src = "/assets/images/no-image.png";
        }}
      />
    );
  }