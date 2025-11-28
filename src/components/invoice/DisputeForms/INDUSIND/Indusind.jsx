import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import indusPg1 from '../../assets/Dispute-Forms/INDUSIND/indus_pg1.jpg';
import tick from '../../assets/tick.png';
import Preview from '../../Components/Preview';
import GeminiFillButton from '../../../GeminiFillButton';
import './indusind.css';

export default function Indusind() {
  const [name, setName] = useState("XXXX");
  const [card, setCard] = useState("XXXX");

  const [tra1, setTra1] = useState("XXXX");
  const [merchant1, setMerchant1] = useState("XXXX");
  const [amount1, setAmount1] = useState("XXXX");

  const [tra2, setTra2] = useState("XXXX");
  const [merchant2, setMerchant2] = useState("XXXX");
  const [amount2, setAmount2] = useState("XXXX");

  const [tra3, setTra3] = useState("XXXX");
  const [merchant3, setMerchant3] = useState("XXXX");
  const [amount3, setAmount3] = useState("XXXX");

  const [tra4, setTra4] = useState("XXXX");
  const [merchant4, setMerchant4] = useState("XXXX");
  const [amount4, setAmount4] = useState("XXXX");

  const [tra5, setTra5] = useState("XXXX");
  const [merchant5, setMerchant5] = useState("XXXX");
  const [amount5, setAmount5] = useState("XXXX");

  const [date, setDate] = useState("XXXX");

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
  const handleCard = (e) => setCard(e.target.value);

  const handleTra1 = (e) => setTra1(e.target.value);
  const handleMerchant1 = (e) => setMerchant1(e.target.value);
  const handleAmount1 = (e) => setAmount1(e.target.value);

  const handleTra2 = (e) => setTra2(e.target.value);
  const handleMerchant2 = (e) => setMerchant2(e.target.value);
  const handleAmount2 = (e) => setAmount2(e.target.value);

  const handleTra3 = (e) => setTra3(e.target.value);
  const handleMerchant3 = (e) => setMerchant3(e.target.value);
  const handleAmount3 = (e) => setAmount3(e.target.value);

  const handleTra4 = (e) => setTra4(e.target.value);
  const handleMerchant4 = (e) => setMerchant4(e.target.value);
  const handleAmount4 = (e) => setAmount4(e.target.value);

  const handleTra5 = (e) => setTra5(e.target.value);
  const handleMerchant5 = (e) => setMerchant5(e.target.value);
  const handleAmount5 = (e) => setAmount5(e.target.value);

  const nameArr = name.split('');

  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    setDate(dd + '/' + mm + '/' + yyyy);
  }, []);


  const handleFillAll = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      setName(data.name || "John Doe");
      setCard(data.card ? data.card.replace(/\D/g, '') : "1234567890123456");

      setTra1(data.tra1 || "01/01/2024");
      setMerchant1(data.merchant1 || "Amazon");
      setAmount1(data.amount1 || "100.00");

      setTra2(data.tra2 || "");
      setMerchant2(data.merchant2 || "");
      setAmount2(data.amount2 || "");

      // Clear others or fill if data exists
      setTra3(""); setMerchant3(""); setAmount3("");
      setTra4(""); setMerchant4(""); setAmount4("");
      setTra5(""); setMerchant5(""); setAmount5("");

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
        <div className="flex">
          <div className="flex gap-10">
            <div>TRANSACTION DATE: </div>
            <input className="input" type="text" value={tra4} onChange={handleTra4} />
          </div>
          <div className="flex gap-10">
            <div>MERCHANT: </div>
            <input className="input" type="text" value={merchant4} onChange={handleMerchant4} />
          </div>
          <div className="flex gap-10">
            <div>TRANSACTION / DISPUTED AMOUNT: </div>
            <input className="input" type="text" value={amount4} onChange={handleAmount4} />
          </div>
        </div>
        <div className="flex">
          <div className="flex gap-10">
            <div>TRANSACTION DATE: </div>
            <input className="input" type="text" value={tra5} onChange={handleTra5} />
          </div>
          <div className="flex gap-10">
            <div>MERCHANT: </div>
            <input className="input" type="text" value={merchant5} onChange={handleMerchant5} />
          </div>
          <div className="flex gap-10">
            <div>TRANSACTION / DISPUTED AMOUNT: </div>
            <input className="input" type="text" value={amount5} onChange={handleAmount5} />
          </div>
        </div>
        <div className="icici-hr-light"></div>
        <button onClick={handleDownload}>DOWNLOAD</button>
      </div >
      <Preview title="PREVIEW INDUSIND DISPUTE FORM" />

      <div className="indusind-form" ref={invoiceRef}>
        <img src={indusPg1} alt="indus form" />

        <div className="indus-card indus-font">{card}</div>
        <div className="indus-name indus-font">{Array.from({ length: 30 }).map((_, index) => (
          <div key={index} className={`indus-name-box-${index + 1}`}>
            {nameArr[index]}
          </div>
        ))}</div>

        <div className="indus-tick"><img src={tick} alt="tick" /></div>
        <div className="indus-date indus-font">{date}</div>
        <div className="indus-sig">{name}</div>

        <div className="indus-transaction-1 indus-font">

          <div className="indus-merchant indus-font">{merchant1}</div>
          <div className="indus-tra-date indus-font">{tra1}</div>
          <div className="indus-amount-1 indus-font">{amount1}</div>
          <div className="indus-amount-2 indus-font">{amount1}</div>
        </div>
        <div className="indus-transaction-2 indus-font">

          <div className="indus-merchant indus-font">{merchant2}</div>
          <div className="indus-tra-date indus-font">{tra2}</div>
          <div className="indus-amount-1 indus-font">{amount2}</div>
          <div className="indus-amount-2 indus-font">{amount2}</div>
        </div>
        <div className="indus-transaction-3 indus-font">

          <div className="indus-merchant indus-font">{merchant3}</div>
          <div className="indus-tra-date indus-font">{tra3}</div>
          <div className="indus-amount-1 indus-font">{amount3}</div>
          <div className="indus-amount-2 indus-font">{amount3}</div>
        </div>
        <div className="indus-transaction-4 indus-font">

          <div className="indus-merchant indus-font">{merchant4}</div>
          <div className="indus-tra-date indus-font">{tra4}</div>
          <div className="indus-amount-1 indus-font">{amount4}</div>
          <div className="indus-amount-2 indus-font">{amount4}</div>
        </div>
        <div className="indus-transaction-5 indus-font">

          <div className="indus-merchant indus-font">{merchant5}</div>
          <div className="indus-tra-date indus-font">{tra5}</div>
          <div className="indus-amount-1 indus-font">{amount5}</div>
          <div className="indus-amount-2 indus-font">{amount5}</div>
        </div>
      </div>
    </>
  )
}