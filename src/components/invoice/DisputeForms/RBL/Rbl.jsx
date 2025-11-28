import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import rblpg1 from '../../assets/Dispute-Forms/RBL/RBL_pg1.jpg';
import rblpg2 from '../../assets/Dispute-Forms/RBL/RBL_pg2.jpg';
import Preview from '../../Components/Preview';
import GeminiFillButton from '../../../GeminiFillButton';
import './rbl.css';

export default function RBL() {
  const [name, setName] = useState("XXXX");
  const [phone, setPhone] = useState("XXXX");
  const [card, setCard] = useState("XXXX");
  const [email, setEmail] = useState("XXXX");

  const [tra1, setTra1] = useState("XXXX");
  const [merchant1, setMerchant1] = useState("XXXX");
  const [amount1, setAmount1] = useState("XXXX");
  const [statement1, setStatement1] = useState("XXXX");

  const [tra2, setTra2] = useState("XXXX");
  const [merchant2, setMerchant2] = useState("XXXX");
  const [amount2, setAmount2] = useState("XXXX");
  const [statement2, setStatement2] = useState("XXXX");

  const [tra3, setTra3] = useState("XXXX");
  const [merchant3, setMerchant3] = useState("XXXX");
  const [amount3, setAmount3] = useState("XXXX");
  const [statement3, setStatement3] = useState("XXXX");

  const [tra4, setTra4] = useState("XXXX");
  const [merchant4, setMerchant4] = useState("XXXX");
  const [amount4, setAmount4] = useState("XXXX");
  const [statement4, setStatement4] = useState("XXXX");

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
  const handlePhone = (e) => setPhone(e.target.value);
  const handleCard = (e) => setCard(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const handleTra1 = (e) => setTra1(e.target.value);
  const handleMerchant1 = (e) => setMerchant1(e.target.value);
  const handleAmount1 = (e) => setAmount1(e.target.value);
  const handleStatement1 = (e) => setStatement1(e.target.value);

  const handleTra2 = (e) => setTra2(e.target.value);
  const handleMerchant2 = (e) => setMerchant2(e.target.value);
  const handleAmount2 = (e) => setAmount2(e.target.value);
  const handleStatement2 = (e) => setStatement2(e.target.value);

  const handleTra3 = (e) => setTra3(e.target.value);
  const handleMerchant3 = (e) => setMerchant3(e.target.value);
  const handleAmount3 = (e) => setAmount3(e.target.value);
  const handleStatement3 = (e) => setStatement3(e.target.value);

  const handleTra4 = (e) => setTra4(e.target.value);
  const handleMerchant4 = (e) => setMerchant4(e.target.value);
  const handleAmount4 = (e) => setAmount4(e.target.value);
  const handleStatement4 = (e) => setStatement4(e.target.value);

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
      setPhone(data.phone || "123-456-7890");
      setCard(data.card ? data.card.replace(/\D/g, '') : "1234567890123456");
      setEmail(data.email || "john.doe@example.com");

      setTra1(data.tra1 || "01-01-2024");
      setMerchant1(data.merchant1 || "Amazon");
      setAmount1(data.amount1 || "100.00");
      setStatement1(data.tra1 || "01-01-2024");

      setTra2(data.tra2 || "");
      setMerchant2(data.merchant2 || "");
      setAmount2(data.amount2 || "");
      setStatement2(data.tra2 || "");

      setTra3(""); setMerchant3(""); setAmount3(""); setStatement3("");
      setTra4(""); setMerchant4(""); setAmount4(""); setStatement4("");

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
          <div className="flex gap-10">
            <div>STATEMENT DATE: </div>
            <input className="input" type="text" value={statement1} onChange={handleStatement1} />
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
          <div className="flex gap-10">
            <div>STATEMENT DATE: </div>
            <input className="input" type="text" value={statement2} onChange={handleStatement2} />
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
          <div className="flex gap-10">
            <div>STATEMENT DATE: </div>
            <input className="input" type="text" value={statement3} onChange={handleStatement3} />
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
          <div className="flex gap-10">
            <div>STATEMENT DATE: </div>
            <input className="input" type="text" value={statement4} onChange={handleStatement4} />
          </div>
        </div>
        <div className="icici-hr-light"></div>
        <button onClick={handleDownload}>DOWNLOAD</button>
      </div >
      <Preview title="PREVIEW RBL DISPUTE FORM" />

      <div className="rbl-form" ref={invoiceRef}>
        <img src={rblpg1} alt="rbl page 1" />
        <img src={rblpg2} alt="rbl page 2" />

        <div className="rbl-name rbl-font">{name}</div>
        <div className="rbl-card rbl-font">{card}</div>
        <div className="rbl-phone rbl-font">{phone}</div>
        <div className="rbl-email rbl-font">{email}</div>
        <div className="rbl-date rbl-font">{date}</div>

        <div className="rbl-transaction-1 rbl-font">
          <div className="rbl-transaction-date rbl-font">{tra1}</div>
          <div className="rbl-merchant rbl-font">{merchant1}</div>
          <div className="rbl-amount rbl-font">{amount1}</div>
          <div className="rbl-amount rbl-font">{amount1}</div>
        </div>
        <div className="rbl-transaction-2 rbl-font">
          <div className="rbl-transaction-date rbl-font">{tra2}</div>
          <div className="rbl-merchant rbl-font">{merchant2}</div>
          <div className="rbl-amount rbl-font">{amount2}</div>
          <div className="rbl-amount rbl-font">{amount2}</div>
        </div>
        <div className="rbl-transaction-3 rbl-font">
          <div className="rbl-transaction-date rbl-font">{tra3}</div>
          <div className="rbl-merchant rbl-font">{merchant3}</div>
          <div className="rbl-amount rbl-font">{amount3}</div>
          <div className="rbl-amount rbl-font">{amount3}</div>
        </div>
        <div className="rbl-transaction-4 rbl-font">
          <div className="rbl-transaction-date rbl-font">{tra4}</div>
          <div className="rbl-merchant rbl-font">{merchant4}</div>
          <div className="rbl-amount rbl-font">{amount4}</div>
          <div className="rbl-amount rbl-font">{amount4}</div>
        </div>

        <div className="rbl-sign-1 rbl-sig">{name}</div>
        <div className="rbl-sign-2 rbl-sig">{name}</div>

        <div className="rbl-statement-1 rbl-font">{statement1}</div>
        <div className="rbl-statement-2 rbl-font">{statement2}</div>
        <div className="rbl-statement-3 rbl-font">{statement3}</div>
        <div className="rbl-statement-4 rbl-font">{statement4}</div>
      </div>
    </>
  )
}