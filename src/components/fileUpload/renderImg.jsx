import { Carousel} from "react-bootstrap";

export default function RenderImg(props) {

  console.log("i am renderimg", props.listImg);

  const listImg=props.listImg;

  return (
    <div>
      <h1 className="text-center fw-bold my-5">
        Picture Uploaded ({listImg.length})
      </h1>
      <div className="bg-dark bg-opacity-25 container-fluid">
        <Carousel style={{ height: 500 }}>
          {listImg.map((img) => (
            <Carousel.Item style={{ height: 1000 }}>
                   <div>
                     <img src={img} alt="i love code" style={{ height: 500 }}/>
                  </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}