//Libs
import React from "react";
import { connect } from "react-redux";
//Scripts
import PageFactory from "../../../../scripts/PageFactory";

const PageLiveVisualization = (props) => {
    function formatJson(data) {
        const content = {};
        content["admin_email"] = props.adminInfo.email;
        content["admin_name"] = props.adminInfo.name;
        content["adminId"] = props.adminInfo.id;
        content["bannerimage"] = props.formData.bannerImage;
        content["buttontext"] = data.buttonText;
        content["company_email"] = "";
        content["company_name"] = props.companyInfo.name;
        content["company_subdomain"] = props.companyInfo.subdomain;
        content["companyid"] = props.companyInfo.id;
        content["containertext"] = data.containerText;
        content["createdat"] = "";
        content["footerimage"] = props.formData.footerImage;
        content["grouplink"] = "";
        content["id"] = "";
        content["pathname"] = data.pathName;
        content["segmentname"] = data.segmentName;
        return content;
    }
    return (
        <div style={{transform: "scale(0.8)"}}>
            {new PageFactory(formatJson(props.formData)).createComponent()}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        companyInfo: state.company.companyInfo,
        adminInfo: state.admin.adminInfo
    }
}
export default connect(mapStateToProps)(PageLiveVisualization);