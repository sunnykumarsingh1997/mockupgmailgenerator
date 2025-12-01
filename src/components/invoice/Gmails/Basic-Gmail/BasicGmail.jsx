import React, { useRef, useState } from 'react';
import './basicGmail.css';
import gmailLogo from "../../assets/gmail-logo.png";
import html2pdf from "html2pdf.js";
import Preview from '../../Components/Preview';
import GeminiFillButton from '../../../GeminiFillButton';
import { addToHistory } from '../../../../utils/history';

export default function BasicGmail() {
  const invoiceRef = useRef();
  const handleDownload = () => {
    const element = invoiceRef.current;
    if (!element) return;
    
    // Calculate dynamic height based on content
    // Each message roughly takes ~200-300px, so for 10+ messages we need more height
    // Convert pixels to inches: 1 inch = 96 pixels (at 96 DPI)
    // With scale 2, we need to account for the scaling
    const contentHeight = element.scrollHeight;
    const contentWidth = element.scrollWidth;
    
    // Convert to inches (96 DPI standard, but html2canvas scale affects this)
    // At scale 2, the image is 2x larger, so we divide by 2 when converting
    const pixelsPerInch = 96;
    const scale = 2;
    
    // Height calculation: (contentHeight * scale) / (pixelsPerInch * scale) = contentHeight / pixelsPerInch
    // But we need to account for the fact that html2pdf will scale it
    const heightInInches = contentHeight / pixelsPerInch;
    const widthInInches = contentWidth / pixelsPerInch;
    
    // Ensure minimum size and add buffer for safety
    const minHeight = 17; // Original minimum
    const minWidth = 9; // Original width
    const buffer = 2; // Extra inches buffer to ensure nothing is cut
    const calculatedHeight = Math.max(minHeight, heightInInches + buffer);
    const calculatedWidth = Math.max(minWidth, widthInInches);
    
    const options = {
      margin: [0, 0, 0, 0],
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: scale,
        useCORS: true,
        logging: false,
        allowTaint: true,
        height: element.scrollHeight,
        width: element.scrollWidth,
        windowHeight: element.scrollHeight,
        windowWidth: element.scrollWidth,
        scrollX: 0,
        scrollY: 0,
        backgroundColor: '#ffffff'
      },
      jsPDF: { 
        unit: 'in', 
        format: [calculatedWidth, calculatedHeight], 
        orientation: 'portrait',
        compress: true
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf()
      .set(options)
      .from(element)
      .save()
      .catch((error) => {
        console.error('PDF generation error:', error);
      });

    addToHistory('Invoice Download', `Basic Gmail - ${subject} - ${merchant}`);
  };

  const [messages, setMessages] = useState([
    { id: 1, sender: 'buyer', content: '', date: '' },
    { id: 2, sender: 'merchant', content: '', date: '' }
  ]);
  const [merchant, setMerchant] = useState('');
  const [buyer, setBuyer] = useState('');
  const [merchantMail, setMerchantMail] = useState('');
  const [buyerMail, setBuyerMail] = useState('');
  const [subject, setSubject] = useState('');

  const handlemerchant = (e) => setMerchant(e.target.value);
  const handlebuyer = (e) => setBuyer(e.target.value);
  const handlemerchantMail = (e) => setMerchantMail(e.target.value);
  const handlebuyerMail = (e) => setBuyerMail(e.target.value);
  const handlesubject = (e) => setSubject(e.target.value);

  const handleMessageChange = (id, field, value) => {
    setMessages(prevMessages => prevMessages.map(msg =>
      msg.id === id ? { ...msg, [field]: value } : msg
    ));
  };

  const handleAddMessage = () => {
    const lastMsg = messages[messages.length - 1];
    const newSender = lastMsg && lastMsg.sender === 'buyer' ? 'merchant' : 'buyer';
    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: newSender,
        content: '',
        date: ''
      }
    ]);
  };

  const handleDeleteMessage = (id) => {
    if (messages.length <= 1) return;
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const handleFillAll = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      setMerchant(data.merchant1 || "Amazon Support");
      setBuyer(data.name || "John Doe");
      setMerchantMail(data.merchant1 ? "support@" + data.merchant1.toLowerCase() + ".com" : "support@amazon.com");
      setBuyerMail(data.email || "john.doe@gmail.com");
      setSubject(data.reason ? "Re: " + data.reason : "Refund Request");

      const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });

      setMessages([
        {
          id: 1,
          sender: 'buyer',
          content: data.contentA || "Hello,\n\nI would like to request a refund for my recent order. The item arrived damaged and I am not satisfied with the quality.\n\nPlease let me know the next steps.\n\nThanks,\nJohn",
          date: dateStr
        },
        {
          id: 2,
          sender: 'merchant',
          content: data.contentB || "Hi John,\n\nWe are sorry to hear that. We have processed your refund request. You should see the amount credited to your account within 5-7 business days.\n\nLet us know if you need anything else.\n\nBest regards,\nSupport Team",
          date: dateStr
        }
      ]);
    } catch (e) {
      console.error("Failed to parse AI response", e);
    }
  };

  return (
    <>
      <div className="basic-gmail-inputs">
        <div style={{ marginBottom: '20px', padding: '10px', background: '#e3f2fd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span><strong>AI Auto-Fill:</strong> Generate a realistic email conversation.</span>
          <GeminiFillButton type="invoice_basic" onFill={handleFillAll} />
        </div>

        {messages.map((msg, index) => (
          <div key={msg.id} style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <label><strong>Message {index + 1} ({msg.sender.toUpperCase()})</strong></label>
              {messages.length > 1 && (
                <button
                  onClick={() => handleDeleteMessage(msg.id)}
                  style={{ background: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer', fontSize: '12px' }}
                >
                  Delete
                </button>
              )}
            </div>
            <textarea
              value={msg.content || ''}
              onChange={(e) => handleMessageChange(msg.id, 'content', e.target.value)}
              rows="4"
              cols="50"
              placeholder="Message content..."
              style={{ width: '100%', padding: '8px', fontFamily: 'inherit' }}
            />
            <div className="flex icici-ends gap-10" style={{ marginTop: '8px' }}>
              <div>DATE: </div>
              <input
                className="input"
                type="text"
                value={msg.date || ''}
                onChange={(e) => handleMessageChange(msg.id, 'date', e.target.value)}
                placeholder="Date..."
              />
            </div>
          </div>
        ))}

        <button
          onClick={handleAddMessage}
          style={{ marginBottom: '20px', padding: '8px 16px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + ADD MESSAGE
        </button>

        <div className="flex icici-ends gap-10">
          <div>MERCHANT NAME: </div>
          <input className="input" type="text" onChange={handlemerchant} value={merchant} />
        </div>
        <div className="flex icici-ends gap-10">
          <div>MERCHANT EMAIL: </div>
          <input className="input" type="text" onChange={handlemerchantMail} value={merchantMail} />
        </div>
        <div className="flex icici-ends gap-10">
          <div>BUYER NAME: </div>
          <input className="input" type="text" onChange={handlebuyer} value={buyer} />
        </div>
        <div className="flex icici-ends gap-10">
          <div>BUYER EMAIL: </div>
          <input className="input" type="text" onChange={handlebuyerMail} value={buyerMail} />
        </div>
        <div className="flex icici-ends gap-10">
          <div>SUBJECT: </div>
          <input className="input" type="text" onChange={handlesubject} value={subject} />
        </div>
        <button onClick={handleDownload}>DOWNLOAD</button>
      </div>

      <Preview title="PREVIEW EMAIL CONVERSATION" />

      <div className="basicgmail-form amazon-mail-font" ref={invoiceRef}>
        <div className="amazon-spacer"></div>

        <div className="amazon-mail-inner-content">
          <div className="flex justify-between align-center">
            <img src={gmailLogo} alt="gmailLogo" />
            <div className="amazon-mail-heading-1 bold">
              {buyer} &lt;{buyerMail}&gt;
            </div>
          </div>

          <div className="amazon-spacer"></div>
          <div className="amazon-mail-hr-dark"></div>
          <div className="amazon-mail-hr-light"></div>
          <div className="amazon-margin-2">
            <div className="amazon-mail-heading-1 bold" style={{ textAlign: 'left' }}>
              {subject}
            </div>
            <div className="amazon-mail-small amazon-mail-font" style={{ textAlign: 'left' }}>{messages.length} messages</div>
          </div>

          <div className="amazon-mail-hr-dark"></div>
          <div className="amazon-mail-hr-light"></div>

          {messages.map((msg, index) => (
            <React.Fragment key={msg.id}>
              {index > 0 && (
                <>
                  <div className="amazon-mail-hr-dark"></div>
                  <div className="amazon-mail-hr-light"></div>
                </>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, paddingLeft: 0, textAlign: 'left' }}>
                    <b>{msg.sender === 'buyer' ? buyer : merchant}</b> &lt;{msg.sender === 'buyer' ? buyerMail : merchantMail}&gt;
                  </p>
                  <p className="amazon-gmail-to-address" style={{ margin: '0 0 10px 0', paddingLeft: 0, textAlign: 'left' }}>To: {msg.sender === 'buyer' ? merchantMail : buyerMail}</p>
                </div>
                <p className="amazon-gmail-date" style={{ margin: 0 }}>
                  {msg.date}
                </p>
              </div>

              <div className="amazon-gmail-content" style={{ whiteSpace: 'pre-wrap', textAlign: 'left', padding: '0', marginLeft: 0 }}>
                {msg.content}
              </div>
            </React.Fragment>
          ))}

        </div>
      </div>
    </>
  )
}