import { React, useRef, useState } from "react";
import "./refTwo.css"
import html2pdf from "html2pdf.js";
import Preview from "../../Components/Preview";
import GeminiFillButton from "../../../GeminiFillButton";

export default function RefTwo() {
  const invoiceRef = useRef();

  const [invoiceNumber, setInvoiceNumber] = useState("393F4753-0001");
  const [receiptNumber, setReceiptNumber] = useState("3770-8198");
  const [dateIssued, setDateIssued] = useState("October 27, 2024");
  const [paymentMethod, setPaymentMethod] = useState("Mastercard - 9680");
  const [billToName, setBillToName] = useState("Joy Ghosh");
  const [billToEmail, setBillToEmail] = useState("joyghosh20246@gmail.com");
  const [amount, setAmount] = useState("999.99");
  const [description, setDescription] = useState("SMMA Incubator Course");
  const [qty, setQty] = useState("1");
  const [unitPrice, setUnitPrice] = useState("999.99");
  const [refundedOn, setRefundedOn] = useState("October 27, 2024");

  const handleFillAll = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      setInvoiceNumber("INV-" + Math.floor(Math.random() * 100000));
      setReceiptNumber("REC-" + Math.floor(Math.random() * 100000));
      setDateIssued(data.date || "October 27, 2024");
      setPaymentMethod("Mastercard - " + (data.card ? data.card.slice(-4) : "9680"));
      setBillToName(data.name || "Joy Ghosh");
      setBillToEmail(data.email || "joyghosh20246@gmail.com");
      setAmount(data.amount1 || "999.99");
      setDescription(data.merchant1 ? data.merchant1 + " Course" : "SMMA Incubator Course");
      setUnitPrice(data.amount1 || "999.99");
      setRefundedOn(data.date || "October 27, 2024");
    } catch (e) {
      console.error("Failed to parse AI response", e);
    }
  };

  const handleDownload = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 0,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: [8.2, 10.99], orientation: 'portrait' }
    };

    html2pdf()
      .from(element)
      .set(options)
      .save();
  };

  return (
    <>
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px', padding: '10px', background: '#e3f2fd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span><strong>AI Auto-Fill:</strong> Generate a realistic refund invoice.</span>
          <GeminiFillButton type="invoice_ref2" onFill={handleFillAll} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          <input className="input" placeholder="Invoice Number" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
          <input className="input" placeholder="Receipt Number" value={receiptNumber} onChange={(e) => setReceiptNumber(e.target.value)} />
          <input className="input" placeholder="Date Issued" value={dateIssued} onChange={(e) => setDateIssued(e.target.value)} />
          <input className="input" placeholder="Payment Method" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
          <input className="input" placeholder="Bill To Name" value={billToName} onChange={(e) => setBillToName(e.target.value)} />
          <input className="input" placeholder="Bill To Email" value={billToEmail} onChange={(e) => setBillToEmail(e.target.value)} />
          <input className="input" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <input className="input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input className="input" placeholder="Refunded On" value={refundedOn} onChange={(e) => setRefundedOn(e.target.value)} />
        </div>

        <button onClick={handleDownload} style={{ marginBottom: '20px' }}>Download PDF</button>
      </div>

      <Preview title="PREVIEW REFUND FORM" />
      <div ref={invoiceRef} className="invoice">
        <div className="top"></div>
        <div className="outer-pad">
          <div className="b-l big">Refund</div>
          <div className="invoice-info">
            <div className="side1">
              <div className=" b-500">Invoice number</div>
              <div className=" b-500">Receipt number</div>
              <div className=" b-500">Date issued</div>
              <div className=" b-500">Payment method</div>
            </div>
            <div className="side2">
              <div className=" b-500">{invoiceNumber}</div>
              <div className=" b-500">{receiptNumber}</div>
              <div className=" b-500">{dateIssued}</div>
              <div className=" b-500">{paymentMethod}</div>
            </div>
          </div>
          <div className="invoice-address">
            <div className="side1">
              <div className=" b-500">coursechamps</div>
              <div className=" b-300">1309 Coffeen Avenue</div>
              <div className=" b-300">STE 1200</div>
              <div className=" b-300">Sheridan, Wyoming 82801</div>
              <div className=" b-300">United States</div>
              <div className=" b-300">+1 929-342-4519</div>
            </div>
            <div className="side2">
              <div className=" b-500">Bill to</div>
              <div className=" b-300">{billToName}</div>
              <div className=" b-300">{billToEmail}</div>
            </div>
          </div>
          <div className="b-l big invoice-address">${amount} refunded on {refundedOn}</div>
          <div className="m-1 b-300">{description}</div>
          <div className="row-details m-1">
            <div className="description t-s">Description</div>
            <div className="qty t-s">QTY</div>
            <div className="unit-price t-s">UNIT PRICE</div>
            <div className="amount t-s">AMOUNT</div>
          </div>
          <div className="hr m-1"></div>
          <div className="row-details m-1">
            <div className="description t-s b-500">{description}</div>
            <div className="qty t-s b-500">{qty}</div>
            <div className="unit-price t-s b-500">${unitPrice}</div>
            <div className="amount t-s b-500">${amount}</div>
          </div>

          <div className="right">
            <div className="hr-light m-3"><div>Subtotal</div><div>${amount}</div></div>
            <div className="hr-light b-none"><div>Total</div><div>${amount}</div></div>
            <div className="hr-light b-none b-500"><div>Amount paid</div><div>${amount}</div></div>
            <div className="hr-light b-none"><div>Refunded on {refundedOn}</div><div>${amount}</div></div>
            <div className="hr-light b-none"><div>Total refunded without credit note</div><div>${amount}</div></div>
          </div>

          <div className="hr-bottom m-x"></div>

          <div className="bottom-text t-s m-2 b-300">Refund instructions <br /> Your refund has been issued by coursechamps. It may take about 5 to 10 days to appear on your statement, if it takes longer please contact your bank for
            assistance.</div>

          <div className="t-s m-1 b-300">{receiptNumber} · ${amount} refunded on {refundedOn}</div>
        </div>
      </div>
    </>
  )
}