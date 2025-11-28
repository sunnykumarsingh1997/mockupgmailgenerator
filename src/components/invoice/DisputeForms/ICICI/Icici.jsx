import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import p1 from '../../assets/Dispute-Forms/ICICI/p1.jpg';
import p2 from '../../assets/Dispute-Forms/ICICI/p2.jpg';
import Preview from '../../Components/Preview';
import GeminiFillButton from '../../../GeminiFillButton';
import './icici.css';

export default function Icici() {
    const [name, setName] = useState("XXXX");
    const [phone, setPhone] = useState("XXXX");
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

    const cardDigits = card.split('');

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

            setTra1(data.tra1 || "01/01/2024");
            setMerchant1(data.merchant1 || "Amazon");
            setAmount1(data.amount1 || "100.00");

            setTra2(data.tra2 || "");
            setMerchant2(data.merchant2 || "");
            setAmount2(data.amount2 || "");

            setTra3(""); setMerchant3(""); setAmount3("");
            setTra4(""); setMerchant4(""); setAmount4("");

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
                <div className="icici-hr-light"></div>
                <button onClick={handleDownload}>DOWNLOAD</button>
            </div >

            <Preview title="PREVIEW ICICI DISPUTE FORM" />

            <div className="icici-invoice " ref={invoiceRef}>
                <img src={p1} alt="icici page 1" />
                <img src={p2} alt="icici page 2" />

                <div className="icici-name icici-font">{name}</div>
                <div className="icici-phone icici-font">{phone}</div>
                <div className="icici-date icici-font">{date}</div>
                <div className="sig-1 icici-dancing-script-sig">{name}</div>

                <div className="icici-card-num1 icici-font">
                    <div>{cardDigits[0]}</div>
                    <div>{cardDigits[1]}</div>
                    <div>{cardDigits[2]}</div>
                    <div>{cardDigits[3]}</div>
                </div>
                <div className="icici-card-num2 icici-font">
                    <div>{cardDigits[4]}</div>
                    <div>{cardDigits[5]}</div>
                    <div>{cardDigits[6]}</div>
                    <div>{cardDigits[7]}</div>
                </div>
                <div className="icici-card-num3 icici-font">
                    <div>{cardDigits[8]}</div>
                    <div>{cardDigits[9]}</div>
                    <div>{cardDigits[10]}</div>
                    <div>{cardDigits[11]}</div>
                </div>
                <div className="icici-card-num4  icici-font">
                    <div>{cardDigits[12]}</div>
                    <div>{cardDigits[13]}</div>
                    <div>{cardDigits[14]}</div>
                    <div>{cardDigits[15]}</div>
                </div>

                <div className="icici-transaction-1 icici-font">
                    <div className="icici-transaction-date icici-font">{tra1}</div>
                    <div className="icici-merchant icici-font">{merchant1}</div>
                    <div className="icici-amount icici-font">{amount1}</div>
                    <div className="icici-amount icici-font">{amount1}</div>
                </div>
                <div className="icici-transaction-2 icici-font">
                    <div className="icici-transaction-date icici-font">{tra2}</div>
                    <div className="icici-merchant icici-font">{merchant2}</div>
                    <div className="icici-amount icici-font">{amount2}</div>
                    <div className="icici-amount icici-font">{amount2}</div>
                </div>
                <div className="icici-transaction-3 icici-font">
                    <div className="icici-transaction-date icici-font">{tra3}</div>
                    <div className="icici-merchant icici-font">{merchant3}</div>
                    <div className="icici-amount icici-font">{amount3}</div>
                    <div className="icici-amount icici-font">{amount3}</div>
                </div>
                <div className="icici-transaction-4 icici-font">
                    <div className="icici-transaction-date icici-font">{tra4}</div>
                    <div className="icici-merchant icici-font">{merchant4}</div>
                    <div className="icici-amount icici-font">{amount4}</div>
                    <div className="icici-amount icici-font">{amount4}</div>

                </div>
            </div>

        </>
    )
}