import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import idfcPg1 from '../../assets/Dispute-Forms/IDFC/IDFC_pg1.jpg';
import idfcPg2 from '../../assets/Dispute-Forms/IDFC/IDFC_pg2.jpg';
import Preview from '../../Components/Preview';
import GeminiFillButton from '../../../GeminiFillButton';
import './idfc.css';

export default function Idfc() {
  const [name, setName] = useState("XXXX");
  const [phone, setPhone] = useState("XXXX");
  const [card, setCard] = useState("XXXX");
  const [place, setPlace] = useState("XXXX");

  const [tra1, setTra1] = useState("XXXX");
  const [merchant1, setMerchant1] = useState("XXXX");
  const [amount1, setAmount1] = useState("XXXX");

  const [tra2, setTra2] = useState("XXXX");
  const [merchant2, setMerchant2] = useState("XXXX");
  const [amount2, setAmount2] = useState("XXXX");

  const [tra3, setTra3] = useState("XXXX");
  const [merchant3, setMerchant3] = useState("XXXX");
  const [amount3, setAmount3] = useState("XXXX");

  const invoiceRef = useRef();

  const handleDownload = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 0,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: [8.27, 11.69], orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
  };

  const handleName = (e) => setName(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleCard = (e) => setCard(e.target.value);
  const handlePlace = (e) => setPlace(e.target.value);

  const handleTra1 = (e) => setTra1(e.target.value);
  const handleMerchant1 = (e) => setMerchant1(e.target.value);
  const handleAmount1 = (e) => setAmount1(e.target.value);

  const handleTra2 = (e) => setTra2(e.target.value);
  const handleMerchant2 = (e) => setMerchant2(e.target.value);
  const handleAmount2 = (e) => setAmount2(e.target.value);

  const handleTra3 = (e) => setTra3(e.target.value);
  const handleMerchant3 = (e) => setMerchant3(e.target.value);
  const handleAmount3 = (e) => setAmount3(e.target.value);

  const cardArr = card.split('');

  // Date logic for the boxes
  const [dateArr, setDateArr] = useState(Array(8).fill(''));
  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const dateStr = dd + mm + yyyy;
    setDateArr(dateStr.split(''));
  }, []);

  const handleFillAll = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      setName(data.name || "John Doe");
      setPhone(data.phone || "123-456-7890");
      setCard(data.card ? data.card.replace(/\D/g, '') : "1234567890123456");
      setPlace(data.address ? data.address.split(',')[1] : "New York");

      setTra1(data.tra1 || "01-01-2024");
      setMerchant1(data.merchant1 || "Amazon");
      setAmount1(data.amount1 || "100.00");

      setTra2(data.tra2 || "");
      setMerchant2(data.merchant2 || "");
      setAmount2(data.amount2 || "");

      setTra3(""); setMerchant3(""); setAmount3("");

    } catch (e) {
      console.error("Failed to parse AI response", e);
    }
  };

  return (
    <>
      <div className="input-fields">
        <div style={{ marginBottom: '20px', padding: '10px', background: '#e3f2fd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span><strong>AI Auto-Fill:</strong> Generate a realistic dispute form.</span>
          <GeminiFillButton type="invoice_dispute" onFill={handleFillAll} />
        </div>

        <div className="flex icici-ends gap-10">
          <div>NAME: </div>
          <input className="input" type="text" value={name} onChange={handleName} />
        </div>
        <div className="flex icici-ends gap-10">
          <div>PHONE / FAX: </div>
          <input className="input" type="text" value={phone} onChange={handlePhone} />
        </div>
        <div className="flex icici-ends gap-10">
          <div>CARD NUMBER: </div>
          <input className="input" type="text" value={card} onChange={handleCard} />
        </div>
        <div className="icici-hr-light"></div>
        <div className="flex">
          <div className="flex gap-10">
            <div>TRANSACTION DATE: </div>
            <input className="input" type="text" value={tra1} onChange={handleTra1} />
          </div>
          <div className="flex gap-10">
            <div>MERCHANT: </div>
            <input className="input" type="text" value={merchant1} onChange={handleMerchant1} />
          </div>
          <div className="flex gap-10">
            <div>TRANSACTION / DISPUTED AMOUNT: </div>
            <input className="input" type="text" value={amount1} onChange={handleAmount1} />
          </div>
        </div>
        <div className="flex">
          <div className="flex gap-10">
            <div>TRANSACTION DATE: </div>
            <input className="input" type="text" value={tra2} onChange={handleTra2} />
          </div>
          <div className="flex gap-10">
            <div>MERCHANT: </div>
            <input className="input" type="text" value={merchant2} onChange={handleMerchant2} />
          </div>
          <div className="flex gap-10">
            <div>TRANSACTION / DISPUTED AMOUNT: </div>
            <input className="input" type="text" value={amount2} onChange={handleAmount2} />
          </div>
        </div>
        <div className="flex">
          <div className="flex gap-10">
            <div>TRANSACTION DATE: </div>
            <input className="input" type="text" value={tra3} onChange={handleTra3} />
          </div>
          <div className="flex gap-10">
            <div>MERCHANT: </div>
            <input className="input" type="text" value={merchant3} onChange={handleMerchant3} />
          </div>
          <div className="flex gap-10">
            <div>TRANSACTION / DISPUTED AMOUNT: </div>
            <input className="input" type="text" value={amount3} onChange={handleAmount3} />
          </div>
        </div>
        <div className="icici-hr-light"></div>
        <button onClick={handleDownload}>DOWNLOAD</button>
      </div >
      <Preview title="PREVIEW IDFC DISPUTE FORM" />

      <div className="idfc-form" ref={invoiceRef}>
        <img src={idfcPg1} alt="idfc pg1" />
        <img src={idfcPg2} alt="idfc pg2" />

        <div className="idfc-date idfc-font flex">
          <div className="date-box-0">{dateArr[0]}</div>
          <div className="date-box-1">{dateArr[1]}</div>
          <div className="date-box-2">{dateArr[2]}</div>
          <div className="date-box-3">{dateArr[3]}</div>
          <div className="date-box-4">{dateArr[4]}</div>
          <div className="date-box-5">{dateArr[5]}</div>
          <div className="date-box-6">{dateArr[6]}</div>
          <div className="date-box-7">{dateArr[7]}</div>
        </div>
        <div className="idfc-date-2 idfc-font flex">
          <div className="date-box-0">{dateArr[0]}</div>
          <div className="date-box-1">{dateArr[1]}</div>
          <div className="date-box-2">{dateArr[2]}</div>
          <div className="date-box-3">{dateArr[3]}</div>
          <div className="date-box-4">{dateArr[4]}</div>
          <div className="date-box-5">{dateArr[5]}</div>
          <div className="date-box-6">{dateArr[6]}</div>
          <div className="date-box-7">{dateArr[7]}</div>
        </div>

        <div className="idfc-card idfc-font">
          <div className="idfc-c-1">{cardArr[0]}{cardArr[1]}{cardArr[2]}{cardArr[3]}</div>
          <div className="idfc-c-2">{cardArr[12]}{cardArr[13]}{cardArr[14]}{cardArr[15]}</div>
        </div>

        <div className="idfc-place idfc-font">{place}</div>
        <div className="idfc-phone idfc-font">{phone}</div>
        <div className="idfc-name idfc-font">{name}</div>

        <div className="idfc-transaction-1 idfc-font">
          <div className="idfc-tra-date idfc-font">{tra1}</div>
          <div className="idfc-merchant idfc-font">{merchant1}</div>
          <div className="idfc-amount idfc-font">{amount1}</div>
          <div className="idfc-amount idfc-font">{amount1}</div>
        </div>
        <div className="idfc-transaction-2 idfc-font">
          <div className="idfc-tra-date idfc-font">{tra2}</div>
          <div className="idfc-merchant idfc-font">{merchant2}</div>
          <div className="idfc-amount idfc-font">{amount2}</div>
          <div className="idfc-amount idfc-font">{amount2}</div>
        </div>
        <div className="idfc-transaction-3 idfc-font">
          <div className="idfc-tra-date idfc-font">{tra3}</div>
          <div className="idfc-merchant idfc-font">{merchant3}</div>
          <div className="idfc-amount idfc-font">{amount3}</div>
          <div className="idfc-amount idfc-font">{amount3}</div>
        </div>
      </div>
    </>
  )
}