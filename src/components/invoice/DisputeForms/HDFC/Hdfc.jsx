import React, { useState, useRef } from "react";
import HdfcDisputeForm from "../../assets/hdfc-dispute.jpg";
import "./hdfc.css";
import Tick from "../../assets/tick.png";
import html2pdf from "html2pdf.js";
import Preview from "../../Components/Preview";
import GeminiFillButton from "../../../../components/GeminiFillButton";

export default function Hdfc() {
  const [name, setName] = useState("");
  const [card, setCard] = useState();
  const [tra1, settra1] = useState("");
  const [merchant1, setMerchant1] = useState("");
  const [amount1, setAmount1] = useState("");
  const [tra2, setTra2] = useState("");
  const [merchant2, setMerchant2] = useState("");
  const [amount2, setAmount2] = useState("");
  const [tra3, setTra3] = useState("");
  const [merchant3, setMerchant3] = useState("");
  const [amount3, setAmount3] = useState("");
  const [tra4, setTra4] = useState("");
  const [merchant4, setMerchant4] = useState("");
  const [amount4, setAmount4] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");

  const handleName = (element) => {
    setName(element.target.value);
  };
  const handleCard = (element) => {
    setCard(element.target.value);
  };
  const handleTra1 = (element) => {
    settra1(element.target.value);
  };
  const handleTra2 = (element) => {
    setTra2(element.target.value);
  };
  const handleTra3 = (element) => {
    setTra3(element.target.value);
  };
  const handleTra4 = (element) => {
    setTra4(element.target.value);
  };
  const handleMerchant1 = (element) => {
    setMerchant1(element.target.value);
  };
  const handleMerchant2 = (element) => {
    setMerchant2(element.target.value);
  };
  const handleMerchant3 = (element) => {
    setMerchant3(element.target.value);
  };
  const handleMerchant4 = (element) => {
    setMerchant4(element.target.value);
  };
  const handleAmount1 = (element) => {
    setAmount1(element.target.value);
  };
  const handleAmount2 = (element) => {
    setAmount2(element.target.value);
  };
  const handleAmount3 = (element) => {
    setAmount3(element.target.value);
  };
  const handleAmount4 = (element) => {
    setAmount4(element.target.value);
  };
  const handleDate = (element) => {
    setDate(element.target.value);
  };
  const handleEmail = (element) => {
    setEmail(element.target.value);
  };
  const cardNumber = card;
  const cardDigits = Array.from(String(cardNumber), Number);

  const invoiceRef = useRef();
  const handleDownload = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 0,
      filename: "DisputeForm.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: "in", format: [13.4, 18], orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  const handleFillAll = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      setName(data.name || "");
      setCard(data.card || "");
      setDate(data.date || "");
      setEmail(data.email || "");
      settra1(data.tra1 || "");
      setMerchant1(data.merchant1 || "");
      setAmount1(data.amount1 || "");
      setTra2(data.tra2 || "");
      setMerchant2(data.merchant2 || "");
      setAmount2(data.amount2 || "");
      setTra3(data.tra3 || "");
      setMerchant3(data.merchant3 || "");
      setAmount3(data.amount3 || "");
      setTra4(data.tra4 || "");
      setMerchant4(data.merchant4 || "");
      setAmount4(data.amount4 || "");
    } catch (e) {
      console.error("Failed to parse AI response", e);
    }
  };

  return (
    <>
      <div className="hdfc-inputfields">
        <div style={{ marginBottom: '20px', padding: '10px', background: '#e3f2fd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span><strong>AI Auto-Fill:</strong> Generate a realistic dispute scenario.</span>
          <GeminiFillButton type="invoice_hdfc" onFill={handleFillAll} />
        </div>

        <div className="flex m-10 gap-10 hdfc-j-ends">
          <div className="name">Name: </div>
          <input type="text" value={name} onChange={handleName} />
        </div>
        <div className="flex m-10 gap-10 hdfc-j-ends">
          <div className="name">16 digits card number: </div>
          <input type="text" value={card} onChange={handleCard} />
        </div>
        <div className="flex m-10 gap-10 hdfc-j-ends">
          <div className="name">Today's date: </div>
          <input type="text" value={date} onChange={handleDate} />
        </div>
        <div className="flex m-10 gap-10 hdfc-j-ends">
          <div className="name">E-mail/Phone/Fax: </div>
          <input type="text" value={email} onChange={handleEmail} />
        </div>
        <div className="hdfc-hr-light"></div>
        <div className="flex">
          <div className="flex m-10 gap-10">
            <div className="name">Transaction Date: </div>
            <input type="text" value={tra1} onChange={handleTra1} />
          </div>
          <div className="flex m-10 gap-10">
            <div className="name">Merchant: </div>
            <input type="text" value={merchant1} onChange={handleMerchant1} />
          </div>
          <div className="flex m-10 gap-10">
            <div className="name">Amount: </div>
            <input type="text" value={amount1} onChange={handleAmount1} />
          </div>
          <div />
        </div>
        <div className="flex">
          <div className="flex m-10 gap-10">
            <div className="name">Transaction Date: </div>
            <input type="text" value={tra2} onChange={handleTra2} />
          </div>
          <div className="flex m-10 gap-10">
            <div className="name">Merchant: </div>
            <input type="text" value={merchant2} onChange={handleMerchant2} />
          </div>
          <div className="flex m-10 gap-10">
            <div className="name">Amount: </div>
            <input type="text" value={amount2} onChange={handleAmount2} />
          </div>
          <div />
        </div>
        <div className="flex">
          <div className="flex m-10 gap-10">
            <div className="name">Transaction Date: </div>
            <input type="text" value={tra3} onChange={handleTra3} />
          </div>
          <div className="flex m-10 gap-10">
            <div className="name">Merchant: </div>
            <input type="text" value={merchant3} onChange={handleMerchant3} />
          </div>
          <div className="flex m-10 gap-10">
            <div className="name">Amount: </div>
            <input type="text" value={amount3} onChange={handleAmount3} />
          </div>
          <div />
        </div>
        <div className="flex">
          <div className="flex m-10 gap-10">
            <div className="name">Transaction Date: </div>
            <input type="text" value={tra4} onChange={handleTra4} />
          </div>
          <div className="flex m-10 gap-10">
            <div className="name">Merchant: </div>
            <input type="text" value={merchant4} onChange={handleMerchant4} />
          </div>
          <div className="flex m-10 gap-10">
            <div className="name">Amount: </div>
            <input type="text" value={amount4} onChange={handleAmount4} />
          </div>
          <div />
        </div>

        <button onClick={handleDownload}>Download</button>
      </div>

      <Preview title="PREVIEW HDFC DISPUTE FORM" />

      <div className="hdfc-form" ref={invoiceRef}>
        <img src={HdfcDisputeForm} alt="hdfc dispute from" />
        <img src={Tick} alt="Tick Logo" className="tick1" />
        <div className="hdfc-name hdfc-font">{name}</div>
        <div className="hdfc-card-num hdfc-font">
          <div>{cardDigits[0]}</div>
          <div>{cardDigits[1]}</div>
          <div>{cardDigits[2]}</div>
          <div>{cardDigits[3]}</div>
          <div>{cardDigits[4]}</div>
          <div>{cardDigits[5]}</div>
          <div>{cardDigits[6]}</div>
          <div>{cardDigits[7]}</div>
          <div>{cardDigits[8]}</div>
          <div>{cardDigits[9]}</div>
          <div>{cardDigits[10]}</div>
          <div>{cardDigits[11]}</div>
          <div>{cardDigits[12]}</div>
          <div>{cardDigits[13]}</div>
          <div>{cardDigits[14]}</div>
          <div>{cardDigits[15]}</div>
        </div>
        <div className="hdfc-transaction-1 hdfc-font">
          <div className="hdfc-date hdfc-font">{tra1}</div>
          <div className="hdfc-merchant hdfc-font">{merchant1}</div>
          <div className="hdfc-amount hdfc-font">{amount1}</div>
        </div>
        <div className="hdfc-transaction-2 hdfc-font">
          <div className="hdfc-date hdfc-font">{tra2}</div>
          <div className="hdfc-merchant hdfc-font">{merchant2}</div>
          <div className="hdfc-amount hdfc-font">{amount2}</div>
        </div>
        <div className="hdfc-transaction-3 hdfc-font">
          <div className="hdfc-date hdfc-font">{tra3}</div>
          <div className="hdfc-merchant hdfc-font">{merchant3}</div>
          <div className="hdfc-amount hdfc-font">{amount3}</div>
        </div>
        <div className="hdfc-transaction-4 hdfc-font">
          <div className="hdfc-date hdfc-font">{tra4}</div>
          <div className="hdfc-merchant hdfc-font">{merchant4}</div>
          <div className="hdfc-amount hdfc-font">{amount4}</div>
        </div>
        <div className="hdfc-mail hdfc-font">{email}</div>
        <div className="hdfc-date-today hdfc-font">{date}</div>
        <div className="hdfc-signature dancing-script-sig">{name}</div>
      </div>
    </>
  );
}