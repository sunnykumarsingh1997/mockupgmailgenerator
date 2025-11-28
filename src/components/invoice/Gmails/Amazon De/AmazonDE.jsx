import { React, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import "./amazonDE.css";
import gmailLogo from "../../assets/gmail-logo.png";
import Preview from "../../Components/Preview";

import GeminiFillButton from "../../../GeminiFillButton";

export default function AmazonDE() {
  const invoiceRef = useRef();

  const handleDownload = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 0,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 5 },
      jsPDF: { unit: "in", format: [9, 12.8], orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  const [name, setName] = useState("XXXX");
  const [email, setEmail] = useState("XXXX");
  const [orderNo, setOrderNo] = useState("XXXX");
  const [day, setDay] = useState("XXXX");
  const [date, setDate] = useState("XXXX");
  const [time, setTime] = useState("XXXX");
  const [amount, setAmount] = useState(0);
  const [item, setItem] = useState("XXXX");
  const [qty, setQTY] = useState("XXXX");
  const [asin, setAsin] = useState("XXXX");
  const [reason, setReason] = useState("XXXX");
  const [card, setCard] = useState("XXXX");
  const [cardLast, setCardLast] = useState("XXXX");
  const [downloadDate, setDownloadDate] = useState("XXXX");

  const [itemRefund, setItemRefund] = useState(0)
  const [shippingRefund, setshippingRefund] = useState(0)
  const [importFeeRefund, setimportFeeRefund] = useState(0)

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOrderNo = (e) => {
    setOrderNo(e.target.value);
  };
  const handleDay = (e) => {
    setDay(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleTime = (e) => {
    setTime(e.target.value);
  };
  const handleQTY = (e) => {
    setQTY(e.target.value);
  };
  const handleAsin = (e) => {
    setAsin(e.target.value);
  };
  const handleReason = (e) => {
    setReason(e.target.value);
  };
  const handleCard = (e) => {
    setCard(e.target.value);
  };
  const handleCardLast = (e) => {
    setCardLast(e.target.value);
  };
  const hanldeItem = (e) => {
    setItem(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleDownloadDate = (e) => {
    setDownloadDate(e.target.value);
  };

  const formatWithCommas = (num) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const calculateRefunds = () => {
    setItemRefund(formatWithCommas(amount * 0.469));
    setshippingRefund(formatWithCommas(amount * 0.234));
    setimportFeeRefund(formatWithCommas(amount * 0.297));
    setAmount(formatWithCommas(amount * 1))
  }

  const handleFillAll = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      setName(data.name || "John Doe");
      setEmail(data.email || "john.doe@example.com");
      setOrderNo(data.tra1 || "302-1234567-1234567");
      setDay(new Date().toLocaleDateString('de-DE', { weekday: 'long' }));
      setDate(data.date || "1. Januar 2024");
      setTime("10:00");
      setAmount(data.amount1 || "100,00");
      setItem(data.item || "Drahtlose Kopfhörer");
      setQTY(data.qty || "1");
      setAsin(data.asin || "B08XXXXXXX");
      setReason(data.reason || "Artikel defekt");
      setCard(data.card ? "Visa" : "MasterCard");
      setCardLast(data.card ? data.card.slice(-4) : "1234");
      setDownloadDate(new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' }));
    } catch (e) {
      console.error("Failed to parse AI response", e);
    }
  };

  return <>

    <div className="input-fields">
      <div style={{ marginBottom: '20px', padding: '10px', background: '#e3f2fd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span><strong>AI Auto-Fill:</strong> Generate a realistic invoice.</span>
        <GeminiFillButton type="invoice_amazon" onFill={handleFillAll} />
      </div>
      <div className="flex icici-ends gap-10">
        <div>NAME: </div>
        <input className="input" type="text" onChange={handleName} />
      </div>
      <div className="flex icici-ends gap-10">
        <div>E-MAIL: </div>
        <input className="input" type="text" onChange={handleEmail} />
      </div>
      <div className="flex icici-ends gap-10">
        <div>ORDER NUMBER: </div>
        <input className="input" type="text" onChange={handleOrderNo} />
      </div>
      <div className="flex icici-ends gap-10">
        <div>DAY: </div>
        <input className="input" type="text" onChange={handleDay} />
      </div>
      <div className="flex icici-ends gap-10">
        <div>DATE: </div>
        <input className="input" type="text" onChange={handleDate} />
      </div>
      <div className="flex icici-ends gap-10">
        <div>TIME: </div>
        <input className="input" type="text" onChange={handleTime} />
      </div>
      <div className="flex icici-ends gap-10">
        <div>AMOUNT: </div>
        <input className="input" type="text" onChange={handleAmount} />
      </div>
      <div className="flex icici-ends gap-10">
        <div>ITEM: </div>
        <input className="input" type="text" onChange={hanldeItem} />
      </div>
      <div className="flex icici-ends gap-10">
        <div>QTY: </div>
        <input className="input" type="text" onChange={handleQTY} />
      </div>
      <div className="flex icici-ends gap-10">
        <div>ASIN: </div>
        <input className="input" type="text" onChange={handleAsin} />
      </div>
      <div className="flex icici-ends gap-10">
        <div>REFUND REASON: </div>
        <input className="input" type="text" onChange={handleReason} />
      </div>
      <div className="flex icici-ends gap-10">
        <div>CARD TYPE: </div>
        <input className="input" type="text" onChange={handleCard} />
      </div>
      <div className="flex icici-ends gap-10">
        <div>CARD LAST 4: </div>
        <input className="input" type="text" onChange={handleCardLast} />
      </div>
      <div className="flex icici-ends gap-10">
        <div>DOWNLOAD DATE: </div>
        <input className="input" type="text" onChange={handleDownloadDate} />
      </div>

      <div className="icici-hr-light"></div>
      <button onClick={calculateRefunds}>CALCULATE</button>
      <div className="icici-hr-light"></div>

      <button onClick={handleDownload}>DOWNLOAD</button>

    </div>

    <Preview title="PREVIEW AMAZON DE FORM" />

    <div className="amazonDE-gmail-form" ref={invoiceRef}>
      <div className="flex amazon-mail-flex-gap">
        <div className="amazon-mail-small amazon-mail-font">
          {downloadDate}
        </div>
        <div className="amazon-mail-small amazon-mail-font">
          Gmail - Refund on order {orderNo}
        </div>
      </div>

      <div className="amazon-spacer"></div>

      <div className="amazon-mail-inner-content">
        <div className="flex justify-between align-center">
          <img src={gmailLogo} alt="gmailLogo" />
          <div className="amazon-mail-heading-1 bold">
            {name} &lt;{email}&gt;
          </div>
        </div>

        <div className="amazon-spacer"></div>
        <div className="amazon-mail-hr-dark"></div>
        <div className="amazon-mail-hr-light"></div>
        <div className="amazon-margin-2">
          <div className="amazon-mail-heading-1 bold ">
            Refund on order {orderNo}
          </div>
          <div className="amazon-mail-small amazon-mail-font">1 message</div>
        </div>
        <div className="amazon-mail-hr-dark"></div>
        <div className="amazon-mail-hr-light"></div>

        <div class="amazon-gmail-from-to flex ">
          <p>
            <b>Amazon.de</b> &lt;payments-messages@amazon.de&gt;
          </p>
          <p class="amazon-gmail-date">
            {day} {date} at {time}
          </p>
        </div>
        <p class="amazon-gmail-to-address">To: {email}</p>

        <div className="amazon-gmail-content">
          Hello, <br /> <div className="amazon-spacer" />
          Greetings from Amazon.de.<div className="amazon-spacer" />

          We are writing to confirm that we are processing your refund in the amount of {formatWithCommas(amount)} INR for your Order {orderNo}.
          This refund is for the following item(s):<div className="amazon-spacer" />

          Item: {item} <br />
          Quantity: {qty}<br />
          ASIN: {asin}<br />
          Reason for refund: {reason}<br />
          <div className="amazon-spacer" />
          The following is the breakdown of your refund for this item:
          <div className="amazon-spacer" />
          Item Refund: {itemRefund} INR <br />
          Import Fee Deposit Refund: {importFeeRefund} INR <br />
          Shipping Refund: {shippingRefund} INR <br />
          <div className="amazon-spacer" />
          Your refund is being credited as follows:
          <div className="amazon-spacer" />
          * to your {card} Credit Card ending with {cardLast}]: {formatWithCommas(amount)} INR
          <div className="amazon-spacer" />
          These amounts will be returned to your payment methods within 10 business days. This process cannot be changed for legal reasons. If the original payment method is no longer available, please contact your bank or credit card company. Otherwise, please contact our customer service.
          <div className="amazon-spacer" />
          Have an issue with your refund, or a question about our refund policy? <br />
          Visit our Help section for more information:
          <div className="amazon-spacer" />
          <p className="amazonDE-blue">http://www.amazon.de/gp/help/customer/display.html?nodeld=504874</p>
          <div className="amazon-spacer" />
          Thank you for shopping at Amazon.de.
          <div className="amazon-spacer" />
          Sincerely,
          <div className="amazon-spacer" />
          Amazon.de Customer Service <br />
          <p className="amazonDE-blue">http://www.amazon.de</p>
        </div>
      </div>
      <p className="amazon-gmail-very-small-font amazonDE-gmail-bottom">
        https://mail.google.com/mail/u/0/?ik=690ff5fc7c&view=pt&search=all&permthid-thread-f:1817787733357290398&simpl-msg-f:181778773335729... 1/1
      </p>
    </div>
  </>;
}
