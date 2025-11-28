import { React, useState } from 'react';
import html2canvas from "html2canvas"; // Import html2canvas
import Preview from '../../Components/Preview';
import header from "../../assets/header-proof.png";
import mastercardLogo from "../../assets/mastercard.png";
import amexLogo from "../../assets/amex.png";
import visaLogo from "../../assets/visa.png";
import "./Stripe.css"
import GeminiFillButton from "../../../GeminiFillButton";

const Stripe = () => {
  const [project, setProject] = useState("Procandi");
  const [card, setcard] = useState(mastercardLogo);
  const [cardlast, setcardlast] = useState("0000");
  const [amount, setamount] = useState("1,050.00");
  const [time, settime] = useState("Mar 2, 2024");
  const [trxTime, setTrxTime] = useState("Apr 2, 2024");
  const [email, setemail] = useState("admin@procandi.com");
  const [currency, setcurrency] = useState("£");
  const [sec, setsec] = useState(10);
  const [invoice, setinvoice] = useState(1232);

  const handleFillAll = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      setProject(data.merchant1 || "Procandi");
      setamount(data.amount1 || "1,050.00");
      setcurrency(data.currency || "£");
      setcardlast(data.card ? data.card.slice(-4) : "0000");
      setemail(data.email || "admin@procandi.com");
      settime(data.date || "Mar 2, 2024");
      setTrxTime(data.tra1 || "Apr 2, 2024");
      setinvoice(Math.floor(1000 + Math.random() * 9000));
    } catch (e) {
      console.error("Failed to parse AI response", e);
    }
  };

  const projecthandeller = (element) => setProject(element.target.value);
  const cardhandeller = (element) => {
    if (element.target.value === "visa") setcard(visaLogo);
    else if (element.target.value === "amex") setcard(amexLogo);
    else if (element.target.value === "m") setcard(mastercardLogo);
  };
  const cardlasthandeller = (element) => setcardlast(element.target.value);
  const amounthandeller = (element) => setamount(element.target.value);
  const timehandeller = (element) => settime(element.target.value);
  const emailhandeller = (element) => setemail(element.target.value);
  const currencyhandeller = (element) => setcurrency(element.target.value);
  const invoicehandeller = (element) => setinvoice(parseInt(element.target.value));
  const trxTimeHandler = (element) => setTrxTime(element.target.value);

  const handleclick = () => {
    incrementTime();
    const randomnumber = Math.floor(Math.random() * 5) + 1;
    setsec(sec + randomnumber);
    setinvoice(invoice + 1);
  };

  // Function to download as JPG
  const downloadJPG = () => {
    const invoiceDiv = document.getElementById("invoice");
    html2canvas(invoiceDiv, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "invoice.jpg";
      link.click();
    });
  };

  const initialTime = new Date();
  initialTime.setHours(10, 15, 22);
  const [hours, sethours] = useState(initialTime);

  const incrementTime = () => {
    const randomSeconds = Math.floor(Math.random() * 5) + 1;
    const newTime = new Date(hours.getTime() + randomSeconds * 1000);
    sethours(newTime);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <>
      <div className="final-flex">
        <div className="editor">
          <div className="details">
            <div style={{ marginBottom: '20px', padding: '10px', background: '#e3f2fd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span><strong>AI Auto-Fill:</strong> Generate a realistic refund invoice.</span>
              <GeminiFillButton type="invoice_stripe" onFill={handleFillAll} />
            </div>
            <div className="flex m-10 gap-10">
              <div className="name">Project: </div>
              <input type="text" onChange={projecthandeller} value={project} />
            </div>
            <div className="flex m-10 gap-10">
              <div className="name">Price: </div>
              <input type="text" onChange={amounthandeller} value={amount} />
            </div>
            <div className="flex m-10 gap-10">
              <div className="name">Currency: </div>
              <input type="text" onChange={currencyhandeller} value={currency} />
            </div>
            <div className="flex m-10 gap-10">
              <div className="name">Card: </div>
              <input type="text" onChange={cardhandeller} placeholder="Type of Card" />
            </div>
            <div className="flex m-10 gap-10">
              <div className="name">Card last 4 digits: </div>
              <input type="text" onChange={cardlasthandeller} value={cardlast} />
            </div>
            <div className="flex m-10 gap-10">
              <div className="name">Email: </div>
              <input type="text" onChange={emailhandeller} value={email} />
            </div>
            <div className="flex m-10 gap-10">
              <div className="name">Refund Date: </div>
              <input type="text" onChange={timehandeller} value={time} />
            </div>
            <div className="flex m-10 gap-10">
              <div className="name">Transaction Date: </div>
              <input type="text" onChange={trxTimeHandler} value={trxTime} />
            </div>
            <div className="flex m-10 gap-10">
              <div className="name">Invoice last 4: </div>
              <input type="text" onChange={invoicehandeller} value={invoice} />
            </div>
            <button onClick={handleclick} className="m-x-2">
              Next
            </button>
            <button onClick={downloadJPG}>Download Invoice</button>
          </div>
          <div className="details">
            <div className="flex m-10 gap-10">
              <div className="name">
                <b>Project:</b> Name of the Merchant
              </div>
            </div>
            <div className="flex m-10 gap-10">
              <div className="name">
                <b>Price:</b> Amount Refunded
              </div>
            </div>
            <div className="flex m-10 gap-10">
              <div className="name">
                <b>Currency:</b> The currency of the amount
              </div>
            </div>
            <div className="flex m-10 gap-10">
              <div className="name">
                <b>Card:</b> The Type of card, Ex - Visa
              </div>
            </div>
            <div className="flex m-10 gap-10">
              <div className="name">
                <b>Card last 4 digits:</b> The last four digits of card
              </div>
            </div>
            <div className="flex m-10 gap-10">
              <div className="name">
                <b>Email:</b> The email of the merchant
              </div>
            </div>
            <div className="flex m-10 gap-10">
              <div className="name">
                <b>Date:</b> The date of refund - Month day, year
              </div>
            </div>
            <div className="flex m-10 gap-10">
              <div className="name">
                <b>Invoice last 4:</b> Any invoice number of your choice
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Section Moved Below Editor */}
        <Preview title="PREVIEW STRIPE REFUND FORM" />

        <div className="stripe-invoice" id="invoice">
          <img src={header} alt="" />
          <div className="title">Refund from {project}</div>
          <div className="invoice-number">Receipt #3395-{invoice}</div>
          <div className="info1-top">
            <div className="top-info">
              <div className="info">Refunded</div>
              <div className="inner-info">
                {currency}
                {amount}
              </div>
            </div>

            <div className="top-info">
              <div className="info">Date issued</div>
              <div className="inner-info">
                {time}, {formatTime(hours)}
              </div>
            </div>

            <div className="top-info">
              <div className="info">Refunded to</div>
              <div className="flex">
                <div className="card-logo">
                  <img src={card} alt="" height="16" />
                </div>
                <div className="inner-info">- {cardlast}</div>
              </div>
            </div>
          </div>
          <div className="hr-center">
            <hr className="horizontal-line" />
          </div>
          <div className="center-it">
            <div className="paragraph">
              <div className="p1">
                This email is to confirm that your refund has been issued by{" "}
                <a href="" className="link-title">
                  {project}
                </a>
                . It can take approximately 10 days to appear on your statement.
                If it takes longer please contact your bank for assistance.
              </div>
            </div>
          </div>
          <div className="summary-line">SUMMARY</div>
          <div className="amount-box">
            <div className="flex">
              <div className="s-text"> Transaction Date </div>
              <div className="s-amount">
                {trxTime}
              </div>
            </div>
            <div className="flex">
              <div className="s-text"> Refund Date </div>
              <div className="s-amount">
                {time}
              </div>
            </div>
            <div className="hr-middle">
              <hr className="horizontal-line" />
            </div>
            <div className="flex">
              <div className="s-text">Total</div>
              <div className="s-amount">
                {currency}
                {amount}
              </div>
            </div>
            <div className="flex m-10">
              <div className="s-text">
                {time}, {formatTime(hours)}
              </div>
              <div className="s-amount">
                {currency}
                {amount}
              </div>
            </div>

            <div className="flex m-10 justify-end">
              <div>
                <strong>Adjusted total</strong>
              </div>
              <div className="s-amount">
                <strong>{currency}0.00</strong>
              </div>
            </div>
          </div>
          <div className="hr-center m-20">
            <hr className="horizontal-line" />
          </div>
          <div className="center-it">
            <div className="paragraph">
              <div className="p1">
                If you have any questions, contact us at{" "}
                <a href="" className="link-title">
                  {email}
                </a>
              </div>
            </div>
          </div>
          <div className="hr-middle stripe-m-x">
            <hr className="horizontal-line" />
          </div>
          <div className="center-it m-c">
            <div className="paragraph">
              <div className="p2">
                Something wrong with the email?{" "}
                <a href="" className="link-2">
                  View it in your browser.
                </a>
              </div>
            </div>
          </div>
          <div className="center-it stripe-m-x ">
            <div className="paragraph">
              <div className="p2">
                You're receiving this email because you made a purchase at{" "}
                {project}, which partners with{" "}
                <a href="" className="link-2">
                  Stripe
                </a>{" "}
                to provide invoicing and payment processing.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stripe;
