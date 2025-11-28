import { React, useState, useRef } from "react";
import Preview from "../../Components/Preview";
import axisDisputeForm from "../../assets/Dispute-Forms/Axis/axis.jpg"
import "./axis.css"
import tick from "../../assets/tick.png"
import html2pdf from "html2pdf.js";
import { motion, useScroll, useTransform } from "framer-motion";
import GeminiFillButton from "../../../../components/GeminiFillButton";

export default function Axis() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [place, setPlace] = useState("")
  const [card, setCard] = useState("")
  const [phone, setPhone] = useState("")
  const [tra1, settra1] = useState("")
  const [merchant1, setMerchant1] = useState("")
  const [amount1, setAmount1] = useState("")
  const [tra2, setTra2] = useState("")
  const [merchant2, setMerchant2] = useState("")
  const [amount2, setAmount2] = useState("")
  const [tra3, setTra3] = useState("")
  const [merchant3, setMerchant3] = useState("")
  const [amount3, setAmount3] = useState("")

  const nameArr = name.split("")
  const emailArr = email.split("")
  const cardArr = card.split("")

  const invoiceRef = useRef();

  const handleDownload = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 0,
      filename: 'DisputeForm.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: [12.7, 19], orientation: 'portrait' }
    };

    html2pdf()
      .from(element)
      .set(options)
      .save();
  };

  const handleFillAll = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      setName(data.name || "");
      setEmail(data.email || "");
      setDate(data.date || "");
      setPlace(data.address || "New Delhi");
      setCard(data.card || "");
      setPhone(data.phone || "9876543210");
      settra1(data.tra1 || "");
      setMerchant1(data.merchant1 || "");
      setAmount1(data.amount1 || "");
      setTra2(data.tra2 || "");
      setMerchant2(data.merchant2 || "");
      setAmount2(data.amount2 || "");
      setTra3(data.tra3 || "");
      setMerchant3(data.merchant3 || "");
      setAmount3(data.amount3 || "");
    } catch (e) {
      console.error("Failed to parse AI response", e);
    }
  };

  const handleName = (element) => {
    setName(element.target.value)
  }
  const handleCard = (element) => {
    setCard(element.target.value)
  }
  const handleTra1 = (element) => {
    settra1(element.target.value)
  }
  const handleTra2 = (element) => {
    setTra2(element.target.value)
  }
  const handleTra3 = (element) => {
    setTra3(element.target.value)
  }
  const handleMerchant1 = (element) => {
    setMerchant1(element.target.value)
  }
  const handleMerchant2 = (element) => {
    setMerchant2(element.target.value)
  }
  const handleMerchant3 = (element) => {
    setMerchant3(element.target.value)
  }
  const handleAmount1 = (element) => {
    setAmount1(element.target.value)
  }
  const handleAmount2 = (element) => {
    setAmount2(element.target.value)
  }
  const handleAmount3 = (element) => {
    setAmount3(element.target.value)
  }
  const handleDate = (element) => {
    setDate(element.target.value)
  }
  const handleEmail = (element) => {
    setEmail(element.target.value)
  }
  const handlePlace = (element) => {
    setPlace(element.target.value)
  }
  const handlePhone = (element) => {
    setPhone(element.target.value)
  }

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100, 200, 500], [1, 0.5, 0.2, 0])

  return (
    <>
      <motion.div className="input-fields" style={{ opacity: y }}>
        <div style={{ marginBottom: '20px', padding: '10px', background: '#e3f2fd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span><strong>AI Auto-Fill:</strong> Generate a realistic dispute scenario.</span>
          <GeminiFillButton type="invoice_axis" onFill={handleFillAll} />
        </div>
        <div className="flex icici-ends gap-10">
          <div>Today's Date: </div>
          <input className="input" type="text" onChange={handleDate} />
        </div>
        <div className="flex icici-ends gap-10">
          <div>NAME: </div>
          <input className="input" type="text" onChange={handleName} />
        </div>
        <div className="flex icici-ends gap-10">
          <div>PHONE / FAX: </div>
          <input className="input" type="text" onChange={handlePhone} />
        </div>
        <div className="flex icici-ends gap-10">
          <div>EMAIL</div>
          <input className="input" type="text" onChange={handleEmail} />
        </div>
        <div className="flex icici-ends gap-10">
          <div>Place</div>
          <input className="input" type="text" onChange={handlePlace} />
        </div>
        <div className="flex icici-ends gap-10">
          <div>CARD NUMBER: </div>
          <input className="input" type="text" onChange={handleCard} />
        </div>
        <div className="icici-hr-light"></div>
        <div className="flex">
          <div className="flex gap-10">
            <div>TRANSACTION DATE: </div>
            <input className="input" type="text" onChange={handleTra1} />
          </div>
          <div className="flex gap-10">
            <div>MERCHANT: </div>
            <input className="input" type="text" onChange={handleMerchant1} />
          </div>
          <div className="flex gap-10">
            <div>TRANSACTION / DISPUTED AMOUNT: </div>
            <input className="input" type="text" onChange={handleAmount1} />
          </div>
        </div>
        <div className="flex">
          <div className="flex gap-10">
            <div>TRANSACTION DATE: </div>
            <input className="input" type="text" onChange={handleTra2} />
          </div>
          <div className="flex gap-10">
            <div>MERCHANT: </div>
            <input className="input" type="text" onChange={handleMerchant2} />
          </div>
          <div className="flex gap-10">
            <div>TRANSACTION / DISPUTED AMOUNT: </div>
            <input className="input" type="text" onChange={handleAmount2} />
          </div>
        </div>
        <div className="flex">
          <div className="flex gap-10">
            <div>TRANSACTION DATE: </div>
            <input className="input" type="text" onChange={handleTra3} />
          </div>
          <div className="flex gap-10">
            <div>MERCHANT: </div>
            <input className="input" type="text" onChange={handleMerchant3} />
          </div>
          <div className="flex gap-10">
            <div>TRANSACTION / DISPUTED AMOUNT: </div>
            <input className="input" type="text" onChange={handleAmount3} />
          </div>
        </div>

        <div className="icici-hr-light"></div>
        <button onClick={handleDownload}>DOWNLOAD</button>
      </motion.div>

      <Preview title="PREVIEW AXIS DISPUTE FORM" />

      <div className="axis-form" ref={invoiceRef}>
        <img src={axisDisputeForm} alt="axis dispute form" />

        <img src={tick} alt="tick" className="tick" />
        <div className="axis-name axis-font">
          {Array.from({ length: 30 }).map((_, index) => (
            <div key={index} className={`axis-name-box-${index + 1}`}>
              {nameArr[index]}
            </div>
          ))}
        </div>
        <div className="axis-std axis-font">091</div>
        <div className="axis-number axis-font">{phone}</div>
        <div className="axis-email axis-font">{Array.from({ length: 30 }).map((_, index) => (
          <div key={index} className={`axis-name-box-${index + 1}`}>
            {emailArr[index]}
          </div>
        ))}</div>

        <div className="axis-card-num1 axis-font">
          <div>{cardArr[0]}</div>
          <div>{cardArr[1]}</div>
          <div>{cardArr[2]}</div>
          <div>{cardArr[3]}</div>
        </div>
        <div className="axis-card-num2 axis-font">
          <div>{cardArr[4]}</div>
          <div>{cardArr[5]}</div>
          <div>{cardArr[6]}</div>
          <div>{cardArr[7]}</div>
        </div>
        <div className="axis-card-num3 axis-font">
          <div>{cardArr[8]}</div>
          <div>{cardArr[9]}</div>
          <div>{cardArr[10]}</div>
          <div>{cardArr[11]}</div>
        </div>
        <div className="axis-card-num4  axis-font">
          <div>{cardArr[12]}</div>
          <div>{cardArr[13]}</div>
          <div>{cardArr[14]}</div>
          <div>{cardArr[15]}</div>
        </div>

        <div className="axis-transaction-1 axis-font">
          <div className="axis-transaction-date axis-font">{tra1}</div>
          <div className="axis-merchant axis-font">{merchant1}</div>
          <div className="axis-amount axis-font">{amount1}</div>
          <div className="axis-amount axis-font">{amount1}</div>
        </div>
        <div className="axis-transaction-2 axis-font">
          <div className="axis-transaction-date axis-font">{tra2}</div>
          <div className="axis-merchant axis-font">{merchant2}</div>
          <div className="axis-amount axis-font">{amount2}</div>
          <div className="axis-amount axis-font">{amount2}</div>
        </div>
        <div className="axis-transaction-3 axis-font">
          <div className="axis-transaction-date axis-font">{tra3}</div>
          <div className="axis-merchant axis-font">{merchant3}</div>
          <div className="axis-amount axis-font">{amount3}</div>
          <div className="axis-amount axis-font">{amount3}</div>
        </div>

        <div className="axis-today-date axis-font">{date}</div>
        <div className="axis-place axis-font">{place}</div>
        <div className="axis-sig">{name}</div>

        <div className="img-tick"><img src={tick} alt="tick" /></div>
      </div>
    </>
  );
}
