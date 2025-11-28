import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import yesbankPg1 from '../../assets/Dispute-Forms/YESBANK/yes1.jpg';
import yesbankPg2 from '../../assets/Dispute-Forms/YESBANK/yes2.jpg';
import Preview from '../../Components/Preview';
import GeminiFillButton from '../../../GeminiFillButton';
import './yesbank.css';

export default function YesBank() {
  const [name, setName] = useState("XXXX");
  const [email, setEmail] = useState("XXXX");
  const [card, setCard] = useState("XXXX");
  const [mob, setMob] = useState("XXXX");

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
  const handleEmail = (e) => setEmail(e.target.value);
  const handleCard = (e) => setCard(e.target.value);
  const handleMob = (e) => setMob(e.target.value);

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
  const cardArr = card.split('');
  const emailArr = email.split('');

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
      setEmail(data.email || "john.doe@example.com");
      setCard(data.card ? data.card.replace(/\D/g, '') : "1234567890123456");
      setMob(data.phone || "9876543210");

      setTra1(data.tra1 || "01/01/2024");
      setMerchant1(data.merchant1 || "Amazon");
      setAmount1(data.amount1 || "100.00");

      setTra2(data.tra2 || "");
      setMerchant2(data.merchant2 || "");
      setAmount2(data.amount2 || "");

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
          <div>EMAIL: </div>
          <input className="input" type="text" value={email} onChange={handleEmail} />
        </div>
        <div className="flex icici-ends gap-10">
          <div>CARD NUMBER: </div>
          <input className="input" type="text" value={card} onChange={handleCard} />
        </div>
        <div className="flex icici-ends gap-10">
          <div>MOB NUMBER: </div>
          <input className="input" type="text" value={mob} onChange={handleMob} />
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
      <Preview title="PREVIEW YES BANK DISPUTE FORM" />

      <div className="yesbank-form" ref={invoiceRef}>
        <img src={yesbankPg1} alt="yes-pg1" />
        <img src={yesbankPg2} alt="yes-pg2" />

        <div className="yes-name-box yes-font">
          {Array.from({ length: 25 }).map((_, index) => (
            <div key={index} className="yes-inner-box">{nameArr[index]}</div>
          ))}
        </div>

        <div className="yes-card-box-1  yes-font">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="yes-inner-box">{cardArr[index]}</div>
          ))}
        </div>
        <div className="yes-card-box-2  yes-font">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="yes-inner-box">{cardArr[index + 12]}</div>
          ))}
        </div>

        <div className="yes-mob-no yes-font">{mob}</div>

        <div className="yes-email-box yes-font">
          {Array.from({ length: 25 }).map((_, index) => (
            <div key={index} className="yes-inner-box">{emailArr[index]}</div>
          ))}
        </div>

        <div className="yes-transaction-1">
          <div className="yes-transaction-date yes-font">{tra1}</div>
          <div className="yes-merchant yes-font">{merchant1}</div>
          <div className="yes-amount yes-font">{amount1}</div>
          <div className="yes-amount yes-font">{amount1}</div>
        </div>
        <div className="yes-transaction-2">
          <div className="yes-transaction-date yes-font">{tra2}</div>
          <div className="yes-merchant yes-font">{merchant2}</div>
          <div className="yes-amount yes-font">{amount2}</div>
          <div className="yes-amount yes-font">{amount2}</div>
        </div>
        <div className="yes-transaction-3">
          <div className="yes-transaction-date yes-font">{tra3}</div>
          <div className="yes-merchant yes-font">{merchant3}</div>
          <div className="yes-amount yes-font">{amount3}</div>
          <div className="yes-amount yes-font">{amount3}</div>
        </div>
        <div className="yes-transaction-4">
          <div className="yes-transaction-date yes-font">{tra4}</div>
          <div className="yes-merchant yes-font">{merchant4}</div>
          <div className="yes-amount yes-font">{amount4}</div>
          <div className="yes-amount yes-font">{amount4}</div>
        </div>
        <div className="yes-transaction-5">
          <div className="yes-transaction-date yes-font">{tra5}</div>
          <div className="yes-merchant yes-font">{merchant5}</div>
          <div className="yes-amount yes-font">{amount5}</div>
          <div className="yes-amount yes-font">{amount5}</div>
        </div>

        <div className="yes-name-down yes-font">{name}</div>
        <div className="yes-name-sign yes-sign">{name}</div>

        <div className="yes-date yes-font">{date}</div>
      </div>

    </>
  )
}