// Script to add mobile placeholders to all certificates
// This will be used to generate the HTML for all certificates

const certificates = [
    { category: "aws", title: "AWS Developer Associate", file: "AWS Developer Associate.pdf" },
    { category: "aws", title: "AWS SysOps Associate", file: "AWS SysOps Associate Certification Training.pdf" },
    { category: "azure", title: "Microsoft Azure Administrator", file: "Microsoft Certified Azure Administrator Associate.pdf" },
    { category: "azure", title: "Microsoft Azure Developer", file: "Microsoft Certified Azure Developer Associate.pdf" },
    { category: "devops", title: "DevOps on AWS", file: "DevOps on AWS.pdf" },
    { category: "devops", title: "DevOps on Azure", file: "DevOps on Azure.pdf" },
    { category: "aws", title: "Cloud Security", file: "Cloud Security.pdf" },
    { category: "data", title: "Big Data Hadoop and Spark", file: "Big Data Hadoop and Spark Developer OSL.pdf" },
    { category: "data", title: "Microsoft Power BI", file: "Microsoft Power BI Certification Training.pdf" },
    { category: "others", title: "Agile Scrum Master", file: "Agile Scrum Master.pdf" },
    { category: "ai", title: "Introduction to Artificial Intelligence", file: "Introduction to Artificial Intelligence.pdf" },
    { category: "ai", title: "Digital Transformation", file: "Digital Transformation.pdf" },
    { category: "data", title: "Business Analytics with Excel", file: "Business Analytics with Excel.pdf" },
    { category: "data", title: "Tableau Desktop Specialist", file: "Tableau Desktop Specialist Certification Training.pdf" },
    { category: "aws", title: "AWS Technical Essentials", file: "AWS Technical Essentials.pdf" },
    { category: "aws", title: "AWS Database Migration", file: "AWS Database Migration.pdf" },
    { category: "aws", title: "Big Data on AWS", file: "Big Data on AWS.pdf" },
    { category: "aws", title: "Cloud Architect Capstone", file: "Cloud Architect Capstone.pdf" },
    { category: "azure", title: "Azure Infrastructure Solutions", file: "Designing Microsoft Azure Infrastructure Solutions.pdf" },
    { category: "azure", title: "Azure Solutions Development", file: "Developing Solutions for Microsoft Azure.pdf" },
    { category: "devops", title: "DevOps Training", file: "DevOps Training.pdf" },
    { category: "others", title: "GIT Training", file: "GIT Training.pdf" },
    { category: "data", title: "Introduction to Data Analytics", file: "Introduction to Data Analytics.pdf" },
    { category: "ai", title: "Robotic Process Automation", file: "Introduction to Robotic Process Automation.pdf" },
    { category: "others", title: "Linux Training", file: "Linux Training.pdf" },
    { category: "azure", title: "Microsoft Azure Fundamentals", file: "Microsoft Azure Fundamentals.pdf" },
    { category: "gcp", title: "Google Cloud Platform Architect", file: "Google Cloud Platform Architect Training.pdf" },
    { category: "gcp", title: "Introduction to Google Cloud", file: "Introduction to Google Cloud Platform.pdf" },
    { category: "gcp", title: "Google Cloud Series", file: "Google Cloud Series.pdf" },
    { category: "ai", title: "Be10X Certificate", file: "Be10X Certificate.pdf" }
];

certificates.forEach(cert => {
    const scrollbar = cert.file === "Google Cloud Series.pdf" ? "1" : "0";
    console.log(`                <div class="preview-item" data-category="${cert.category}" onclick="openPDF('Certificates/${cert.file}')">
                    <h4>${cert.title}</h4>
                    <embed src="Certificates/${cert.file}#toolbar=0&navpanes=0&scrollbar=${scrollbar}" type="application/pdf" />
                    <div class="mobile-pdf-placeholder">
                        <i class="fas fa-file-pdf"></i>
                        <p>PDF Certificate</p>
                        <button class="mobile-view-btn" onclick="event.stopPropagation(); openPDF('Certificates/${cert.file}')">View Certificate</button>
                    </div>
                </div>`);
});