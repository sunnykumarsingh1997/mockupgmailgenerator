import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Analytics } from "@vercel/analytics/react"

import "./InvoiceGenerator.css";
import Stripe from "./refundInvoices/stripe/Stripe";
import RefTwo from "./refundInvoices/ref2/RefundInvoice.jsx";
import Hdfc from "./DisputeForms/HDFC/Hdfc";
import Icici from "./DisputeForms/ICICI/Icici.jsx";
import Axis from "./DisputeForms/AXIS/Axis.jsx";
import Yesbank from "./DisputeForms/YESBANK/Yesbank.jsx";
import Rbl from "./DisputeForms/RBL/Rbl.jsx";
import Idfc from "./DisputeForms/IDFC/Idfc.jsx";
import Indusind from "./DisputeForms/INDUSIND/Indusind.jsx";
import Kotak from "./DisputeForms/KOTAK/Kotak.jsx";
import Footer from "./Components/Footer.jsx";
import BasicGmail from "./Gmails/Basic-Gmail/BasicGmail.jsx";
import AmazonGmail from "./Gmails/Amazon-Gmail/AmazonGmail.jsx";
import TblRefund from "./Gmails/TblRefund/TblRefund.jsx";
import AmazonDE from "./Gmails/Amazon De/AmazonDE.jsx";
import AmazonCa from "./Gmails/Amazon Ca/AmazonCa.jsx";
import AmazonUk from "./Gmails/Amazon Uk/AmazonUk.jsx";
import AmazonES from "./Gmails/Amazon ES/AmazonES.jsx";

import FormIcon from "./Components/FormIcon.jsx";
import TBLRefundIcon from "./assets/TBL-refund-icon.png"

import hdfcIcon from "./assets/hdfc-dispute.jpg";
import stripeIcon from "./assets/stripe-icon.png";
import refund2Icon from "./assets/ref2-icon.png";
import iciciIcon from "./assets/Dispute-Forms/ICICI/p1.jpg";
import axisIcon from "./assets/Dispute-Forms/Axis/axis.jpg";
import yesbankIcon from "./assets/Dispute-Forms/YESBANK/yes1.jpg";



import rblIcon from "./assets/Dispute-Forms/RBL/RBL_pg1.jpg";
import idfcIcon from "./assets/Dispute-Forms/IDFC/IDFC_pg1.jpg";
import indusIcon from "./assets/Dispute-Forms/INDUSIND/indus_pg1.jpg";
import kotakIcon from "./assets/Dispute-Forms/KOTAK/kotak-pg1.jpg";
import amazonAeIcon from "./assets/amazonAE-gmail-icon.png"
import amazonDeIcon from "./assets/amazonDE-gmail-icon.png"
import basicGmailIcon from "./assets/basic-gmail-icon.png"

function InvoiceGenerator() {
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isIconSelected, setIsIconSelected] = useState(false);

    const handleIconClick = (componentName) => {
        setSelectedIcon(componentName);
        setIsIconSelected(true);
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
    };

    const handleBackClick = () => {
        setSelectedIcon(null);
        setIsIconSelected(false);
    };

    const renderComponent = () => {
        if (isIconSelected) {
            switch (selectedIcon) {
                case "hdfc":
                    return <Hdfc />;
                case "stripe":
                    return <Stripe />;
                case "ref2":
                    return <RefTwo />;
                case "icici":
                    return <Icici />;
                case "axis":
                    return <Axis />;
                case "yesbank":
                    return <Yesbank />;
                case "rbl":
                    return <Rbl />;
                case "idfc":
                    return <Idfc />;
                case "indus":
                    return <Indusind />;
                case "kotak":
                    return <Kotak />;
                case "basicGmail":
                    return <BasicGmail />
                case "amazonGmail":
                    return <AmazonGmail />
                case "tblRefund":
                    return <TblRefund />
                case "amazonDERefund":
                    return <AmazonDE />
                case "amazonUKRefund":
                    return <AmazonUk />
                case "amazonCARefund":
                    return <AmazonCa />
                case "amazonESRefund":
                    return <AmazonES />
                default:
                    return null;
            }
        } else {
            return null; // No need to render anything if no icon is selected
        }
    };

    const { scrollY } = useScroll();
    const disputesOpacity = useTransform(scrollY, [100, 200, 300], [1, 0.5, 0.1]);
    const gmailOpacity = useTransform(scrollY, [300, 400, 500], [0.3, 0.5, 1]);

    return (
        <div className="invoice-generator-wrapper">
            <div className="app-header">
                <div className="logo">EASY INVOICE TOOL</div>
            </div>

            <div className="component-display">{renderComponent()}</div>

            {/* Only show this section if no icon is selected */}
            {!isIconSelected && (
                <>
                    <motion.div className="dispute-forms" style={{ opacity: disputesOpacity }}>
                        <div className="app-title">DISPUTE FORMS</div>
                        <div className="flex gap-10 h-scroll">
                            <motion.div
                                className="app-icon"
                                onClick={() => handleIconClick("hdfc")}
                                whileHover={{ scale: 0.9 }}
                            >
                                <FormIcon image={hdfcIcon} title={"HDFC"} />
                            </motion.div>
                            <motion.div
                                className="app-icon"
                                onClick={() => handleIconClick("icici")}
                                whileHover={{ scale: 0.9 }}
                            >
                                <FormIcon image={iciciIcon} title={"ICICI"} />
                            </motion.div>
                            <motion.div
                                className="app-icon"
                                onClick={() => handleIconClick("axis")}
                                whileHover={{ scale: 0.9 }}
                            >
                                <FormIcon image={axisIcon} title={"AXIS"} />
                            </motion.div>
                            <motion.div
                                className="app-icon"
                                onClick={() => handleIconClick("yesbank")}
                                whileHover={{ scale: 0.9 }}
                            >
                                <FormIcon image={yesbankIcon} title={"YES BANK"} />
                            </motion.div>
                            <motion.div
                                className="app-icon"
                                onClick={() => handleIconClick("rbl")}
                                whileHover={{ scale: 0.9 }}
                            >
                                <FormIcon image={rblIcon} title={"RBL"} />
                            </motion.div>
                            <motion.div
                                className="app-icon"
                                onClick={() => handleIconClick("idfc")}
                                whileHover={{ scale: 0.9 }}
                            >
                                <FormIcon image={idfcIcon} title={"IDFC"} />
                            </motion.div>
                            <motion.div
                                className="app-icon"
                                onClick={() => handleIconClick("indus")}
                                whileHover={{ scale: 0.9 }}
                            >
                                <FormIcon image={indusIcon} title={"INDUSIND"} />
                            </motion.div>
                            <motion.div
                                className="app-icon"
                                onClick={() => handleIconClick("kotak")}
                                whileHover={{ scale: 0.9 }}
                            >
                                <FormIcon image={kotakIcon} title={"KOTAK"} />
                            </motion.div>
                        </div>
                    </motion.div>

                    <div className="refund-invoice">
                        <div className="app-title">REFUND INVOICES</div>
                        <div className="flex gap-10">
                            <motion.div
                                className="app-icon"
                                onClick={() => handleIconClick("stripe")}
                                whileHover={{ scale: 0.9 }}
                            >
                                <FormIcon image={stripeIcon} title={"STRIPE"} />
                            </motion.div>
                            <motion.div
                                className="app-icon"
                                onClick={() => handleIconClick("ref2")}
                                whileHover={{ scale: 0.9 }}
                            >
                                <FormIcon image={refund2Icon} title={"REFUND 2"} />
                            </motion.div>
                            <motion.div
                                className="app-icon"
                                onClick={() => handleIconClick("tblRefund")}
                                whileHover={{ scale: 0.9 }}
                            >
                                <FormIcon image={TBLRefundIcon} title={"TBL REFUND GMAIL"} />
                            </motion.div>
                        </div>
                    </div>
                    <motion.div className="refund-invoice" >
                        <div className="app-title">GMAIL FORMATS</div>
                        <motion.div className="flex gap-10 " initial={{ opacity: 1 }} // Default opacity
                            animate={{ opacity: gmailOpacity }}>
                            <motion.div
                                className="app-icon"
                                onClick={() => handleIconClick("basicGmail")}
                                whileHover={{ scale: 0.9 }}
                            >
                                <FormIcon image={basicGmailIcon} title={"GMAIL COMMUNICATION"} />
                            </motion.div>
                            <motion.div
                                className="app-icon"
                                onClick={() => handleIconClick("amazonGmail")}
                                whileHover={{ scale: 0.9 }}
                            >
                                <FormIcon image={amazonAeIcon} title={"AMAZON AE GMAIL"} />
                            </motion.div>

                            <motion.div
                                className="app-icon"
                                onClick={() => handleIconClick("amazonDERefund")}
                                whileHover={{ scale: 0.9 }}
                            >
                                <FormIcon image={amazonDeIcon} title={"Amazon DE INVOICE"} />
                            </motion.div>

                            <motion.div
                                className="app-icon"
                                onClick={() => handleIconClick("amazonUKRefund")}
                                whileHover={{ scale: 0.9 }}
                            >
                                <FormIcon image={amazonDeIcon} title={"Amazon UK INVOICE"} />
                            </motion.div>
                            <motion.div
                                className="app-icon"
                                onClick={() => handleIconClick("amazonCARefund")}
                                whileHover={{ scale: 0.9 }}
                            >
                                <FormIcon image={amazonDeIcon} title={"Amazon CA INVOICE"} />
                            </motion.div>
                            <motion.div
                                className="app-icon"
                                onClick={() => handleIconClick("amazonESRefund")}
                                whileHover={{ scale: 0.9 }}
                            >
                                <FormIcon image={amazonDeIcon} title={"Amazon ES INVOICE"} />
                            </motion.div>

                        </motion.div>
                    </motion.div>
                </>
            )}
            <motion.div className=" back-btn" whileHover={{ scale: 1.1 }}>
                {isIconSelected && (
                    <button
                        onClick={handleBackClick}
                        className="Header-button btn-yellow "
                    >
                        BACK
                    </button>
                )}
            </motion.div>
            <Analytics />
            <Footer />
        </div>
    );
}

export default InvoiceGenerator;
