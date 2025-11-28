import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import kotakPg1 from '../../assets/Dispute-Forms/KOTAK/kotak-pg1.jpg';
import kotakPg2 from '../../assets/Dispute-Forms/KOTAK/kotak-pg2.jpg';
import tick from '../../assets/tick.png';
import Preview from '../../Components/Preview';
import GeminiFillButton from '../../../GeminiFillButton';
import './kotak.css';

export default function Kotak() {
  const [name, setName] = useState("XXXX");
  const [card, setCard] = useState("XXXX");
  const [email, setEmail] = useState("XXXX");

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

  const [debitTick, setDebitTick] = useState(true);
  const [creditTick, setCreditTick] = useState(false);

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
  const handleEmail = (e) => setEmail(e.target.value);

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

  const handleDebitClick = () => { setDebitTick(!debitTick); setCreditTick(false); };
  const handleCreditClick = () => { setCreditTick(!creditTick); setDebitTick(false); };

  const nameArr = name.split('');
  const emailArr = email.split('');

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
      setCard(data.card ? data.card.replace(/\D/g, '') : "1234567890123456");
      setEmail(data.email || "john.doe@example.com");

      setTra1(data.tra1 || "01-01-2024");
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
        <div className="flex icici-ends gap-10">
          <div>EMAIL: </div>
          <input className="input" type="text" value={email} onChange={handleEmail} />
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

      <Preview title="PREVIEW KOTAK DISPUTE FORM" />

      <div className="kotak-form" ref={invoiceRef}>
        <img src={kotakPg1} alt="" />
        <img src={kotakPg2} alt="" />

        <div onClick={handleDebitClick}><div className="kotak-tick-debit">{debitTick && <img src={tick} alt="tock" />}</div></div>
        <div onClick={handleCreditClick}><div className="kotak-tick-credit">{creditTick && <img src={tick} alt="tock" />}</div></div>

        <div className="kotak-name kotak-font">{Array.from({ length: 30 }).map((_, index) => (
          <div key={index} className={`kotak-name-box-${index + 1} kotak-box`}>
            {nameArr[index]}
          </div>
        ))}</div>

        <div className="kotak-card kotak-font">{card}</div>
        <div className="refund-tick"><img src={tick} alt="" /></div>

        <div className="kotak-sig-1">{name}</div>
        <div className="kotak-sig-2">{name}</div>
        <div className="kotak-today-day kotak-font">
          <div className="k-d-1">{dateArr[0]}</div>
          <div className="k-d-1">{dateArr[1]}</div>
          <div className="k-d-1">{dateArr[2]}</div>
          <div className="k-d-1">{dateArr[3]}</div>
          <div className="kotak-year">
            <div>{dateArr[4]}</div>
            <div>{dateArr[5]}</div>
            <div>{dateArr[6]}</div>
            <div>{dateArr[7]}</div>
          </div>
        </div>

        <div className="kotak-transaction-1 kotak-font">
          <div className="kotak-tra-date kotak-font">{tra1}</div>
          <div className="kotak-merchant kotak-font">{merchant1}</div>
          <div className="kotak-amount-1 kotak-font">{amount1}</div>
          <div className="kotak-amount-2 kotak-font">{amount1}</div>
        </div>
        <div className="kotak-transaction-2 kotak-font">
          <div className="kotak-tra-date kotak-font">{tra2}</div>
          <div className="kotak-merchant kotak-font">{merchant2}</div>
          <div className="kotak-amount-1 kotak-font">{amount2}</div>
          <div className="kotak-amount-2 kotak-font">{amount2}</div>
        </div>
        <div className="kotak-transaction-3 kotak-font">
          <div className="kotak-tra-date kotak-font">{tra3}</div>
          <div className="kotak-merchant kotak-font">{merchant3}</div>
          <div className="kotak-amount-1 kotak-font">{amount3}</div>
          <div className="kotak-amount-2 kotak-font">{amount3}</div>
        </div>
        <div className="kotak-transaction-4 kotak-font">
          <div className="kotak-tra-date kotak-font">{tra4}</div>
          <div className="kotak-merchant kotak-font">{merchant4}</div>
          <div className="kotak-amount-1 kotak-font">{amount4}</div>
          <div className="kotak-amount-2 kotak-font">{amount4}</div>
        </div>
        <div className="kotak-transaction-5 kotak-font">
          <div className="kotak-tra-date kotak-font">{tra5}</div>
          <div className="kotak-merchant kotak-font">{merchant5}</div>
          <div className="kotak-amount-1 kotak-font">{amount5}</div>
          <div className="kotak-amount-2 kotak-font">{amount5}</div>
        </div>

        <div className="kotak-email kotak-font">{Array.from({ length: 30 }).map((_, index) => (
          <div key={index} className={`axis-name-box-${index + 1}`}>
            {emailArr[index]}
          </div>
        ))}</div>
      </div>
    </>
  );
}