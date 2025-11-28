import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
// import TBLlogo from '../../assets/teachable-logo.png'; // Logo not found
import Preview from '../../Components/Preview';
import GeminiFillButton from '../../../GeminiFillButton';
import './tblRefund.css';

export default function TblRefund() {
    const [name, setName] = useState("XXXX");
    const [email, setEmail] = useState("XXXX");
    const [course, setCourse] = useState("XXXX");
    const [address1, setAddress1] = useState("XXXX");
    const [address2, setAddress2] = useState("XXXX");
    const [address3, setAddress3] = useState("XXXX");
    const [orderNo, setOrderNo] = useState("XXXX");
    const [purchased, setPurchased] = useState("XXXX");
    const [issued, setIssued] = useState("XXXX");
    const [refID, setRefID] = useState("XXXX");
    const [card, setCard] = useState("XXXX");
    const [cardLast, setCardLast] = useState("XXXX");
    const [amount, setAmount] = useState("XXXX");
    const [courseID, setCourseID] = useState("XXXX");

    const invoiceRef = useRef();

    const handleDownload = () => {
        const element = invoiceRef.current;
        const options = {
            margin: 0,
            filename: 'invoice.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: [8.5, 11], orientation: 'portrait' }
        };
        html2pdf().from(element).set(options).save();
    };

    const handleFillAll = (jsonString) => {
        try {
            const data = JSON.parse(jsonString);
            setName(data.name || "John Doe");
            setEmail(data.email || "john@example.com");
            setCourse(data.item || "React Mastery Course");
            setAddress1(data.address || "123 Tech Street");
            setAddress2("Suite 100");
            setAddress3("San Francisco, CA 94105");
            setOrderNo(data.tra1 || "123456789");
            setPurchased(data.date || "Jan 1, 2024");
            setIssued(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
            setRefID("REF-" + Math.floor(Math.random() * 100000));
            setCard(data.card ? "Visa" : "MasterCard");
            setCardLast(data.card ? data.card.slice(-4) : "1234");
            setAmount(data.amount1 || "99.00");
            setCourseID("CRS-" + Math.floor(Math.random() * 1000));
        } catch (e) {
            console.error("Failed to parse AI response", e);
        }
    };

    return (
        <>
            <div className="input-fields">
                <div style={{ marginBottom: '20px', padding: '10px', background: '#e3f2fd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span><strong>AI Auto-Fill:</strong> Generate a realistic refund invoice.</span>
                    <GeminiFillButton type="invoice_tbl" onFill={handleFillAll} />
                </div>

                <div className="flex icici-ends gap-10"><div>Name:</div><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></div>
                <div className="flex icici-ends gap-10"><div>Email:</div><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div className="flex icici-ends gap-10"><div>Course:</div><input type="text" value={course} onChange={(e) => setCourse(e.target.value)} /></div>
                <div className="flex icici-ends gap-10"><div>Address 1:</div><input type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} /></div>
                <div className="flex icici-ends gap-10"><div>Address 2:</div><input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} /></div>
                <div className="flex icici-ends gap-10"><div>Address 3:</div><input type="text" value={address3} onChange={(e) => setAddress3(e.target.value)} /></div>
                <div className="flex icici-ends gap-10"><div>Order No:</div><input type="text" value={orderNo} onChange={(e) => setOrderNo(e.target.value)} /></div>
                <div className="flex icici-ends gap-10"><div>Purchased Date:</div><input type="text" value={purchased} onChange={(e) => setPurchased(e.target.value)} /></div>
                <div className="flex icici-ends gap-10"><div>Issued Date:</div><input type="text" value={issued} onChange={(e) => setIssued(e.target.value)} /></div>
                <div className="flex icici-ends gap-10"><div>Ref ID:</div><input type="text" value={refID} onChange={(e) => setRefID(e.target.value)} /></div>
                <div className="flex icici-ends gap-10"><div>Card:</div><input type="text" value={card} onChange={(e) => setCard(e.target.value)} /></div>
                <div className="flex icici-ends gap-10"><div>Card Last 4:</div><input type="text" value={cardLast} onChange={(e) => setCardLast(e.target.value)} /></div>
                <div className="flex icici-ends gap-10"><div>Amount:</div><input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
                <div className="flex icici-ends gap-10"><div>Course ID:</div><input type="text" value={courseID} onChange={(e) => setCourseID(e.target.value)} /></div>

                <button onClick={handleDownload}>DOWNLOAD</button>
            </div>

            <Preview title="PREVIEW TEACHABLE REFUND INVOICE" />

            <div className="tbl-invoice-body" id="invoice" ref={invoiceRef}>
                <div className="tbl-invoice-container">
                    <div className="tbl-invoice-logo">{/* <img src={TBLlogo} alt="" /> */}</div>
                    <h1 className="tbl-invoice-header">{course}</h1>

                    <div className="tbl-invoice-hr"></div>

                    <div className="tbl-invoice-section tbl-invoice-info">
                        <div>
                            <h2 className="tbl-invoice-section-header">Contact Information</h2>
                            <p>{name}</p>
                            <p className="tbl-invoice-tblColor">{email}</p>
                        </div>
                        <div>
                            <h2 className="tbl-invoice-section-header">Billing Info</h2>
                            <p>{address1}</p>
                            <p>{address2}</p>
                            <p>{address3}</p>
                            <h2 className="tbl-invoice-section-header">Delivery Address</h2>
                            <p>{address1}</p>
                            <p>{address2}</p>
                            <p>{address3}</p>
                        </div>
                    </div>

                    <div className="tbl-invoice-hr"></div>

                    <div className="tbl-invoice-section tbl-invoice-info">
                        <div>

                            <p className="tbl-invoice-bold">Order Number: {orderNo}</p>
                            <p>Purchased Date: {purchased}</p>
                            <p>Issued Date: {issued}</p>
                            <p>Reference number: {refID}</p>
                        </div>
                        <div>
                            <h2 className="tbl-invoice-section-header">Payment Method</h2>
                            <p>{card} - *{cardLast}</p>
                            <p>{name}</p>
                        </div>
                    </div>

                    <div className="tbl-invoice-hr"></div>

                    <div className="tbl-invoice-section flex">
                        <div className="tbl-invoice-totals-left">
                            <div className="flex tbl-invoice-section-amounts">
                                <div className="tbl-invoice-bold tbl-invoice-header-course">{course} (ID: {courseID})</div>
                                <div>{amount}</div>
                            </div>
                            <div className="flex tbl-invoice-section-amounts"><div>Subtotal</div><div>{amount}</div></div>
                            <div className="flex tbl-invoice-section-amounts"><div>Total</div><div>{amount}</div></div>
                            <div className="flex tbl-invoice-section-amounts"><div>Amount Refunded</div><div>{amount}</div></div>
                            <div className="flex tbl-invoice-section-amounts"><div>Adjusted Tax (0.0%)</div><div>£0</div></div>
                            <div className="flex tbl-invoice-section-amounts tbl-invoice-bold"><div>Adjusted Total (GBP)</div><div className="tbl-invoice-bold">£0</div></div>
                        </div>
                    </div>

                    <div className="tbl-invoice-hr"></div>

                    <div className="tbl-invoice-footer tbl-invoice-section flex">
                        <div>
                            <div className="tbl-invoice-bold">Provider</div> <p className="tbl-invoice-tblColor">Procandi Limited - Coaching for Entrepreneurs</p>
                            <p className="tbl-invoice-link-color">Procandi.co.uk</p>
                        </div>

                        <div className="tbl-invoice-margin-left-10">
                            <div className="tbl-invoice-bold">Supplier</div> <p className="tbl-invoice-tblColor">Teachable</p>
                            <p><span className="tbl-invoice-link-color">470 Park Ave South</span>, Sixth Floor <br /> New York, NY 10016 US</p>
                            <p>Tax ID: 100500265200003</p>
                        </div>
                    </div>

                    <div className="tbl-invoice-hr"></div>

                    <div className="tbl-invoice-copyright">Not a Tax Invoice</div>
                    <div className="tbl-invoice-copyright">Questions about this payment? Contact Procandi Limited - Coaching for Entreprenuers</div>
                    <div className="tbl-invoice-copyright">© Procandi.co.uk</div>
                </div>

            </div>
        </>
    );
}