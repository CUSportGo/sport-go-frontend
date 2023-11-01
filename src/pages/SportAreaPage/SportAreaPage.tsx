import { useParams } from "react-router-dom";
import "./SportAreaPage.css";
import SportAreaInfo from "../../components/SportAreaInfo/SportAreaInfo";
import { useEffect } from "react";
import { apiClient } from "../../utils/clients";
import BookingContainer from "../../components/BookingContainer/BookingContainer";
import { SportArea } from "../../types/sportarea.dto";

const SportAreaPage = () => {
  const { id } = useParams();

  const data: SportArea = {
    id: "0",
    name: "SportAreaPage",
    location: "254 ถ. พญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330",
    description:
      "ที่พักนี้มีบริการอินเทอร์เน็ต Wi-Fi ฟรีในทุกห้องพัก ช่วยให้การเดินทางสะดวกยิ่งขึ้นไปอีก ที่พักตั้งอยู่ในย่านประตูน้ำของกรุงเทพ ผู้เข้าพักจึงได้อยู่ใกล้สถานที่ท่องเที่ยวน่าสนใจและร้านอาหารอร่อยๆ ทริปยังไม่จบถ้าไม่ได้แวะไปที่เที่ยวชื่อดังอย่าง วัดพระเชตุพนวิมลมังคลาราม (วัดโพธิ์) ด้วยอีกสักที่ ที่พัก 4.5 ดาวคุณภาพสูงแห่งนี้มี สระว่ายน้ำในร่ม และ ฟิตเนสเซ็นเตอร์ คอยอำนวยความสะดวกแก่ผู้เข้าพัก",
    imageURL: [
      "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eiffel_Tower_Vertical.JPG/602px-Eiffel_Tower_Vertical.JPG?20080622213711",
      "https://ak-d.tripcdn.com/images/1i66l22159wqhjwjlEFCC_W_640_0_R5_Q80.jpg?proc=source/trip",
      "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
    ],
    carPark: true,
    shower: false,
    sportType: ["Badminton", "Football"],
    latitude: 1.1,
    longitude: 1.1,
    price: 500,
    sportList: [
      {
        sportType: "Football",
        area: [
          {
            id: "6542373b3da813a14a3a750d",
            name: "Football area 1",
            openTime: "12:00",
            closeTime: "21:00",
            price: 200,
          },
          {
            id: "65423b0a7051101080e9d8b3",
            name: "Football area 2",
            openTime: "12:00",
            closeTime: "21:00",
            price: 200,
          },
        ],
      },
    ],
  };

  useEffect(() => {
    const fetchSportArea = async () => {
      await apiClient
        .getSportAreaByID(id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchSportArea();
  }, []);

  return (
    <div className="sportareaPage-container">
      <SportAreaInfo
        name={data.name}
        locaiton={data.location}
        description={data.description}
        carpark={true}
        shower={false}
        image={data.imageURL}
      />
      <BookingContainer sportAreaId={id || ""} sportList={data.sportList} />
    </div>
  );
};

export default SportAreaPage;
