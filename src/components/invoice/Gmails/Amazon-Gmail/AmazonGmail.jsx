import { React, useRef, useState } from "react";
import "./amazonGmail.css";
import html2pdf from "html2pdf.js";
import amazonAeLogo from "../../assets/amazon-ae-logo.png";
import amazonLogo from "../../assets/amazon-logo-1.png";

import gmailLogo from "../../assets/gmail-logo.png";
import Preview from "../../Components/Preview";

import GeminiFillButton from "../../../GeminiFillButton";

export default function AmazonGmail() {
  const invoiceRef = useRef();

  const handleDownload = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 0,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 5 },
      jsPDF: { unit: "in", format: [9, 11.8], orientation: "portrait" },
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
  const [cardEXP, setCardEXP] = useState("XXXX");
  const [downloadDate, setDownloadDate] = useState("XXXX");

  const [itemRefund, setItemRefund] = useState(0);
  const [itemTaxRefund, setItemTaxRefund] = useState(0);
  const [shippingRefund, setShippingRefund] = useState(0);
  const [shippingTaxRefund, setshippingTaxRefund] = useState(0);
  const [shippingPromotionDeduction, setshippingPromotionDeduction] =
    useState(0);
  const [shippingPromotionTaxDeduction, setshippingPromotionTaxDeduction] =
    useState(0);

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
  const handleCardEXP = (e) => {
    setCardEXP(e.target.value);
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
    const roundToTwoDecimals = (num) => Math.round(num * 100) / 100;

    setItemRefund(formatWithCommas(roundToTwoDecimals(amount * 0.9524)));
    setItemTaxRefund(formatWithCommas(roundToTwoDecimals(amount * 0.0476)));
    setShippingRefund(formatWithCommas(roundToTwoDecimals(amount * 0.003)));
    setshippingTaxRefund(formatWithCommas(roundToTwoDecimals(amount * 0.0001)));
    setshippingPromotionDeduction(
      formatWithCommas(roundToTwoDecimals(amount * -0.003))
    ); // Negative
    setshippingPromotionTaxDeduction(
      formatWithCommas(roundToTwoDecimals(amount * -0.0001))
    ); // Negative
  };

  const handleFillAll = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      setName(data.name || "John Doe");
      setEmail(data.email || "john.doe@example.com");
      setOrderNo(data.tra1 || "123-1234567-1234567");
      setDay(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
      setDate(data.date || "January 1, 2024");
      setTime("10:00 AM");
      setAmount(data.amount1 || "100.00");
      setItem(data.item || "Wireless Headphones");
      setQTY(data.qty || "1");
      setAsin(data.asin || "B08XXXXXXX");
      setReason(data.reason || "Item defective");
      setCard(data.card ? "Visa" : "MasterCard");
      setCardEXP(new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }));
      setDownloadDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    } catch (e) {
      console.error("Failed to parse AI response", e);
    }
  };

  return (
    <>
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
          <div>CARD EXP: </div>
          <input className="input" type="text" onChange={handleCardEXP} />
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

      <Preview title="PREVIEW AMAZON AE FORM" />
      {/* FORM STARTS */}
      <div className="amazon-gmail-form" ref={invoiceRef}>
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
              {name} &lt;{email} &gt;
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
              <b>Amazon.ae</b> &lt;payments-messages@amazon.ae&gt;
            </p>
            <p class="amazon-gmail-date">
              {day} {date} at {time}
            </p>
          </div>
          <p class="amazon-gmail-to-address">To: {email}</p>
          <div className="amazon-gmail-content">
            <div>
              <img
                className="amazon-gmail-amazonAeLogo"
                src={amazonAeLogo}
                alt="amazon AE logo"
              />
            </div>
            <p className="amazon-gmail-hello">Hello,</p>
            <p className="amazon-gmail-greeting">Greetings from Amazon.ae</p>
            <p>
              We are writing to confirm that we have processed a refund of AED
              {formatWithCommas(amount)} for your Amazon.ae Order {orderNo}.
              This amount has been credited to your original payment method and
              will appear in your account in 5-7 business days.
            </p>
            <p className="amazon-gmail-m-20">
              This refund is for the following item(s):
            </p>
            <p className="amazon-gmail-item">
              Item: {item} <br />
              Quantity: {qty} <br />
              ASIN: {asin} <br />
              Reason for refund: {reason}
            </p>
            <p className="amazon-gmail-item">
              The following is the breakdown of your refund for this item:{" "}
              <br />
              <p className="amazon-gmail-item">
                Item Refund: AED{itemRefund} <br />
                Item Tax Refund: AED{itemTaxRefund} <br />
                Shipping Refund: AED{shippingRefund} <br />
                Shipping Tax Refund: AED{shippingTaxRefund} <br />
                Shipping Promotion Deduction*: -AED{
                  shippingPromotionDeduction
                }{" "}
                <br />
                Shipping Promotion Tax Deduction*: -AED
                {shippingPromotionTaxDeduction}
              </p>
            </p>
            Total Refund: AED{formatWithCommas(amount)}
            <p>
              * About Promotions: <br />
              Since a promotional certificate or discount was used for this
              order, your refund reflects the amount paid for the given item(s)
              after these promotions were applied. Examples of
              promotions/discounts include Free Shipping, Buy 3 Get 1 Free, 10%
              off your order, etc. <br />
            </p>
          </div>
        </div>
        <p className="amazon-gmail-very-small-font">
          https://mail.google.com/mail/u/2/?ik=343d82da01&view=pt&search=all&permthid-thread-:1815632972258384601&simpl-msg-:1815632972258384601
          1/2
        </p>
        {/* page 2 */}

        <div className="flex amazon-mail-flex-gap amazon-gmail-page-2">
          <div className="amazon-mail-small amazon-mail-font">
            {downloadDate}
          </div>
          <div className="amazon-mail-small amazon-mail-font">
            Gmail - Refund on order {orderNo}
          </div>
        </div>
        {/* main CONTENT */}
        <div className="amazon-gmail-content">
          <p>
            {card} Credit Card [expiring on {cardEXP}]: AED
            {formatWithCommas(amount)} <br />
            These amounts will be returned to your payment methods within 7
            business days.
          </p>

          <div className="amazon-spacer"></div>
          <div className="amazon-spacer"></div>

          <p>
            When you use a promotional certificate or other discount on your
            order, you will not <br /> be refunded for the amount of the
            promotional offer, as this amount was deducted <br />
            from the original purchase. Any unexpired promotional funds used on
            the order are <br />
            returned to your account for use toward future qualifying purchases.
            Please note that <br /> the original expiration date still applies.
          </p>

          <div className="amazon-spacer"></div>
          <div className="amazon-spacer"></div>
          <div className="amazon-spacer"></div>

          <p>
            Thank you for shopping at Amazon.ae. <br /> Sincerely, Amazon.ae
          </p>
          <div className="amazon-spacer"></div>
          <p className="amazonDE-blue">http://www.amazon.ae</p>

          <div className="amazon-spacer"></div>
          <div className="amazon-spacer"></div>

          <p>
            Note: this e-mail was sent from a notification-only e-mail address
            that cannot accept <br />
            incoming e-mail. Please do not reply to this message.
          </p>

          <div className="amazon-spacer"></div>
          <div className="amazon-spacer"></div>

          <p>
            ©2024 Amazon.com, Inc, or its affiliates. All rights reserved.
            Amazon, Amazon.ae, <br /> Amazon.com and the Amazon.ae logo are
            trademarks of Amazon.com, Inc. or its affiliates. Amazon.com, <span className="amazonDE-blue">410
              Terry Avenue N., Seattle, WA 98109-5210.</span>
          </p>

          <img
            className="amazon-gmail-amazonLogo"
            src={amazonLogo}
            alt="amazonLogo"
          />
          <p className="amazon-gmail-very-small-font amazon-gmail-bottom">
            https://mail.google.com/mail/u/2/?k=343d82da01&view=pt&search=all&permthid-thread-:1815632972258384601&simpl-msg-f:1815632972258384601
            2/2
          </p>
        </div>
      </div>
    </>
  );
}
