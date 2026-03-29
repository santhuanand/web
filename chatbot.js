(function () {
    'use strict';

    var knowledge = [
        { keys: ['name', 'who', 'yourself', 'introduce', 'about you', 'about santhosh', 'tell me about'], answer: 'I am Santhosh Anand, an Engineering Manager at Commonwealth Bank of Australia. I have 13+ years of experience building scalable, high-impact digital platforms across Banking, HRTech, HealthTech, and more. As I say: "I don\'t just build software, I build the teams and systems that deliver it at scale."' },
        { keys: ['year', 'experience', 'how long', 'career', 'history', 'background', 'journey', 'total', 'how many'], answer: 'Santhosh has 13+ years of professional experience (since Nov 2012). His career spans 6 roles: Engineering Manager at CBA (2026-Present), Senior Dev Manager at TeamLease (2019-2026), Senior Software Engineer at Clario (2017-2019), Software Engineer at Softtek (2015-2016), Senior Developer at ATG Solutions Dubai (2014-2015), and Software Engineer at AGS Infotech (2012-2014).' },
        { keys: ['current', 'cba', 'commonwealth', 'bank', 'australia', 'now', 'present', 'working now', 'work now', 'currently'], answer: 'I currently work as an Engineering Manager at Commonwealth Bank of Australia (since Mar 2026). I lead the Customer Onboarding and Life Cycle Crew under Business Banking - Everyday Business Banking domain, managing a team of 15 members.' },
        { keys: ['teamlease', 'previous', 'last company', 'before cba', 'hrtech', 'staffing'], answer: 'At TeamLease Services Ltd (Sep 2019 - Mar 2026), I was Senior Development Manager leading a team of 10 in HRTech, Staffing & Compliance. Key achievements: served 3,500+ clients and 3L+ active users daily, designed workflow automation with n8n/Amazon Q achieving 40% efficiency gain, 95% sprint goal achievement using Agile Scrum, and 35% improvement in support response times through API-driven workflows.' },
        { keys: ['clario', 'bioclinica', 'health', 'clinical', 'trial', 'pharma', 'abbott', 'astrazeneca', 'pfizer'], answer: 'At Clario/BioClinica (Jan 2017 - Sep 2019), I was Senior Software Engineer in HealthTech, developing clinical trial management software for Abbott, AstraZeneca, and Pfizer. Achievements: 15% improvement in data accuracy and regulatory compliance, 20% faster clinical trial data availability through real-time analytics, and 25% boost in system responsiveness through query optimization.' },
        { keys: ['softtek', 'sterling', 'verification', 'background check'], answer: 'At Softtek India (Nov 2015 - Dec 2016), I was Software Engineer supporting Sterling Talent Solutions (US) background verification systems. Achievements: 99% SLA compliance rate, automated reconciliation scripts reducing manual effort by 35%, and processed 50,000+ background verification records daily with 99.9% accuracy.' },
        { keys: ['dubai', 'atg', 'zaabeel', 'dafza', 'mashreq', 'mastercard', 'payment', 'gateway', 'erp', 'hospitality'], answer: 'At ATG Solutions LLC, Dubai (Nov 2014 - Oct 2015), I was Senior Software Developer (Consultant) working on ERP and Online Payments for Za\'abeel Palace Hospitality and DAFZA. Achievements: developed payment gateways for Mashreq Bank and Mastercard (30% processing efficiency gain), implemented ERP suite (25% operational improvement), and led onsite-offshore coordination for multi-million-dollar hospitality ERP.' },
        { keys: ['ags', 'sedc', 'utility', 'upn', 'billing', 'winforms', 'first job'], answer: 'At AGS Infotech Ltd (Nov 2012 - Oct 2014), I was Software Engineer developing core billing and reporting modules for the UPN utility management platform for client SEDC, USA. Built UI and Notes modules using .NET WinForms, enhanced user experience, and participated in code reviews improving software quality and defect rates.' },
        { keys: ['skill', 'tech', 'stack', 'language', 'framework', 'tools', 'proficien', 'what can', 'good at', 'expert', 'react', 'javascript', 'node', 'html', 'css', 'ado.net', 'api', 'microservice', 'rest'], answer: 'Core skills: C#/ASP.NET/.NET Core (95%), JavaScript/React/Node.js (85%), RESTful APIs/Microservices (88%), HTML/CSS/ADO.NET (85%), AWS (EC2, S3, SQS, SES, IAM, RDS - 90%), Azure/CI-CD (80%), DevOps (70%), SQL Server (95%), PostgreSQL/MySQL (85%), DB Performance Optimization (90%), Amazon Q/GitHub Copilot (85%), n8n Workflow Automation (80%), Team Management (95%), Agile/Scrum (92%).' },
        { keys: ['cloud', 'aws', 'azure', 'devops', 'ec2', 's3', 'lambda', 'ci/cd', 'pipeline', 'docker', 'kubernetes', 'container'], answer: 'Strong cloud expertise: AWS (EC2, S3, SQS, SES, IAM, RDS) at 90%, Azure/CI-CD Pipelines at 80%, DevOps best practices at 70%. Certified in AWS Solutions Architect Associate, AWS Developer Associate, AWS SysOps Associate, Azure Administrator, Azure Developer, Cloud Security, and Cloud Architect Master Program (Simplilearn, Oct 2024).' },
        { keys: ['.net', 'c#', 'csharp', 'asp.net', 'dotnet', 'core', 'microsoft'], answer: 'Santhosh is a .NET expert with 95% proficiency in C#/ASP.NET/.NET Core. He has built enterprise applications using .NET WinForms, WPF/WCF, MVC, and .NET Core with React frontends. His .NET expertise spans all 6 roles across 13+ years.' },
        { keys: ['database', 'sql', 'data', 'postgres', 'mysql', 'query', 'optimization', 'oracle', 'power bi', 'tableau', 'hadoop', 'spark', 'big data', 'analytics'], answer: 'Deep database expertise: Microsoft SQL Server (95%), PostgreSQL/MySQL (85%), and Database Performance Optimization (90%). Achieved 25% query performance boost at Clario. Also certified in Big Data Hadoop & Spark, Power BI, Tableau, Business Analytics with Excel, and Introduction to Data Analytics.' },
        { keys: ['ai', 'artificial', 'machine', 'automation', 'copilot', 'amazon q', 'chatgpt', 'n8n'], answer: 'Actively uses AI tools: Amazon Q & GitHub Copilot (85%), n8n Workflow Automation (80%). Designed self-hosted workflow automation at TeamLease achieving 40% reduction in manual task time. Holds certifications in Introduction to AI, Digital Transformation, Robotic Process Automation, Be10X, AI Outskill Mastermind, Python Using AI Workshop, and Bring AI to Work.' },
        { keys: ['certif', 'credential', 'course', 'training', 'how many cert', 'simplilearn', 'cloud architect master'], answer: 'Santhosh holds 34+ professional certifications across 7 categories:<br><br><b>AWS (8):</b> Solutions Architect Associate, Developer Associate, SysOps Associate, Technical Essentials, Database Migration, Big Data on AWS, Cloud Security, Cloud Architect Capstone<br><b>Azure (5):</b> Administrator Associate, Developer Associate, Fundamentals, Infrastructure Solutions, Solutions Development<br><b>Google Cloud (3):</b> Platform Architect, Introduction to GCP, Cloud Series<br><b>DevOps (3):</b> DevOps on AWS, DevOps on Azure, DevOps Training<br><b>Data & Analytics (5):</b> Big Data Hadoop & Spark, Power BI, Tableau Desktop Specialist, Business Analytics with Excel, Intro to Data Analytics<br><b>AI (7):</b> Intro to AI, Digital Transformation, RPA, Be10X, AI Outskill Mastermind, Python Using AI Workshop, Bring AI to Work<br><b>Others (3):</b> Agile Scrum Master, GIT Training, Linux Training<br><br>Plus Cloud Architect Master Program (Simplilearn, Oct 2024). View all on the <a href="certificates.html">Certifications page</a>.' },
        { keys: ['aws cert', 'aws solution', 'aws developer', 'aws sysops'], answer: 'Santhosh holds 8 AWS certifications: Solutions Architect Associate, Developer Associate, SysOps Associate, Technical Essentials, Database Migration, Big Data on AWS, Cloud Security, and Cloud Architect Capstone.' },
        { keys: ['azure cert', 'azure admin', 'azure develop'], answer: 'Santhosh holds 5 Azure certifications: Microsoft Certified Azure Administrator Associate, Azure Developer Associate, Azure Fundamentals, Designing Azure Infrastructure Solutions, and Developing Solutions for Microsoft Azure.' },
        { keys: ['gcp', 'google cloud cert'], answer: 'Santhosh holds 3 Google Cloud certifications: Google Cloud Platform Architect Training, Introduction to Google Cloud Platform, and Google Cloud Series.' },
        { keys: ['education', 'degree', 'university', 'college', 'study', 'mca', 'bca', 'vtu', 'tumkur', 'qualification', 'academic'], answer: 'Master of Computer Applications (MCA) from VTU Bengaluru with 75% (2012) and Bachelor of Computer Applications (BCA) from Tumkur University with 81% (2009).' },
        { keys: ['project', 'portfolio', 'built', 'delivered', 'product'], answer: 'Key projects: HRTech Platform (3,500+ clients, 3L+ users, .NET Core/React/AWS/Postgres/AI), Clinical Trial Management for Abbott/AstraZeneca/Pfizer (C#/SQL Server/WPF-WCF, 25% performance boost), Background Verification System for Sterling US (50K+ daily records, 99.9% accuracy), ERP & Payment Gateway for Za\'abeel Palace Dubai (Mashreq Bank/Mastercard, multi-million dollar), Utility Management Platform for SEDC USA (.NET WinForms), and 15+ freelancing projects with 100% client satisfaction.' },
        { keys: ['freelanc', 'side project', 'independent', 'client satisfaction'], answer: 'Santhosh has completed 15+ freelancing projects including custom web applications, e-commerce solutions, and business automation tools using C#, React, and Node.js, with 100% client satisfaction.' },
        { keys: ['team', 'lead', 'manage', 'leadership', 'people', 'member', 'size', 'report'], answer: 'Currently leads 15 members at CBA. Previously managed 10 at TeamLease. Expertise in team empowerment, Agile/Scrum (92%), and innovation. Achieved 95% sprint goal success, 40% efficiency gains, and earned repeated client commendations for quality and delivery.' },
        { keys: ['achievement', 'metric', 'impact', 'result', 'number', 'stat', 'accomplish'], answer: 'Key metrics: 3,500+ clients served, 3L+ daily active users, 40% efficiency gain via automation, 95% sprint goal achievement, 35% faster support response, 25% query performance boost, 20% faster clinical data, 15% data accuracy improvement, 99% SLA compliance, 50K+ daily records processed, 30% payment processing efficiency, 15+ freelance projects with 100% satisfaction.' },
        { keys: ['contact', 'reach', 'email', 'phone', 'hire', 'connect', 'talk', 'message', 'mobile', 'number', 'call', 'linkedin url', 'youtube url', 'youtube link', 'linkedin link', 'profile link', 'social link'], answer: 'You can reach Santhosh at santhuanand7@gmail.com, call +91 9036046342, or connect via:<br><br><b>LinkedIn:</b> <a href="https://www.linkedin.com/in/santhoshanand" target="_blank" rel="noopener noreferrer">linkedin.com/in/santhoshanand</a><br><b>YouTube:</b> <a href="https://www.youtube.com/@creativesmarttech" target="_blank" rel="noopener noreferrer">youtube.com/@creativesmarttech</a><br><b>WhatsApp:</b> <a href="https://whatsapp.com/channel/0029VbCcBxWJf05lQvBem22R" target="_blank" rel="noopener noreferrer">Creative Smart Tech Channel</a><br><br>Or use the <a href="#contact" onclick="document.querySelector(\'#contact\').scrollIntoView({behavior:\'smooth\'});closeChatPanel();">contact form</a> on this page.' },
        { keys: ['location', 'city', 'where based', 'where live', 'where from', 'from', 'country', 'india', 'bengaluru', 'bangalore', 'reside'], answer: 'Santhosh is based in Bengaluru, India. He has also worked internationally in Dubai, UAE (2014-2015).' },
        { keys: ['resume', 'cv', 'download', 'pdf', 'document'], answer: 'You can download Santhosh\'s portfolio document from the <a href="Portfolio.pdf" target="_blank" rel="noopener noreferrer">Portfolio PDF</a> link on the homepage.' },
        { keys: ['youtube', 'video', 'channel', 'tutorial', 'creative smart', 'watch', 'subscribe'], answer: function () {
            var cards = document.querySelectorAll('.youtube-grid .youtube-card');
            var list = '';
            cards.forEach(function (c, i) {
                if (i >= 3) return;
                var title = c.querySelector('h3');
                var date = c.querySelector('.youtube-date');
                if (title) list += '<br>' + (i + 1) + '. ' + title.textContent + (date ? ' (' + date.textContent + ')' : '');
            });
            return 'Santhosh runs the <a href="https://www.youtube.com/@creativesmarttech" target="_blank" rel="noopener noreferrer">Creative Smart Tech</a> YouTube channel.' + (list ? '<br><br><b>Latest videos:</b>' + list : '') + '<br><br>Check the <a href="#youtube-section" onclick="document.querySelector(\'#youtube-section\').scrollIntoView({behavior:\'smooth\'});closeChatPanel();">videos section</a> for more. <b>Don\'t forget to <a href="https://www.youtube.com/@creativesmarttech?sub_confirmation=1" target="_blank" rel="noopener noreferrer">Subscribe</a>!</b>';
        } },
        { keys: ['linkedin', 'article', 'post', 'blog', 'write', 'thought leadership', 'read', 'follow'], answer: function () {
            var cards = document.querySelectorAll('.linkedin-grid .linkedin-card');
            var list = '';
            cards.forEach(function (c, i) {
                if (i >= 3) return;
                var title = c.querySelector('.gradient-title');
                var date = c.querySelector('.gradient-date');
                if (title) list += '<br>' + (i + 1) + '. ' + title.textContent + (date ? ' (' + date.textContent + ')' : '');
            });
            return 'Santhosh shares perspectives on engineering leadership, scalable architecture, and technology strategy on LinkedIn.' + (list ? '<br><br><b>Latest articles:</b>' + list : '') + '<br><br>Check the <a href="#insights" onclick="document.querySelector(\'#insights\').scrollIntoView({behavior:\'smooth\'});closeChatPanel();">Thought Leadership</a> section for more. <b><a href="https://www.linkedin.com/in/santhoshanand" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a> to stay updated!</b>';
        } },
        { keys: ['recommend', 'testimonial', 'review', 'feedback', 'what others say', 'what people say', 'reference'], answer: 'Santhosh has 8 recommendations:<br><br><b>Kabir Ahmed</b> (Sr QA Manager, TeamLease): "One of the most hardworking and dedicated professionals... his logical thinking consistently helps in identifying solutions under pressure."<br><br><b>Ashok Kumaresan</b> (Sr Engineer, Genpact): "Exceptional leadership and a profound understanding of the .NET ecosystem... remarkable track record of delivering complex projects on schedule."<br><br><b>Ankit Jha</b> (Sr Delivery Manager, Clarivate): "One of the brightest minds... rare ability to simplify complex challenges and bring clarity."<br><br><b>Namratha Shurapali</b> (Advanced SW Engineer, Honeywell): "Commitment to team empowerment and innovation... earned repeated client commendations for exceptional quality."<br><br><b>Nilesh Rathod</b> (Analyst, Tourism Saskatchewan): "Sincere, hardworking... strong command of .NET, Oracle, and SQL Server with excellent problem-solving skills."<br><br><b>Harsha S</b> (Sr Security Reliability Engineer, CME Group): "Excellent team player... abilities to think outside the box helped our team work on many solutions better."<br><br><b>Dilipkumar D P</b> (Sr eCOA Specialist, Eli Lilly): "Hardworking, reliable, and dedicated... consistently strives to deliver quality results."<br><br><b>Ashwini Javagal</b> (Sr SDE, TeamLease): "Highly dedicated professional... sharp ability to analyze and solve complex problems."<br><br>See the <a href="#recommendations" onclick="document.querySelector(\'#recommendations\').scrollIntoView({behavior:\'smooth\'});closeChatPanel();">Recommendations</a> section.' },
        { keys: ['kabir', 'kabir ahmed'], answer: '<b>Kabir Ahmed</b> (Sr QA Manager, TeamLease) says: "I\'ve had the pleasure of working with Santhosh, and I can confidently say he is one of the most hardworking and dedicated professionals I\'ve come across. He is always available to support the team, whether it\'s addressing production issues or lending a hand to resolve challenges. His logical thinking consistently helps in identifying solutions and making sound decisions under pressure."' },
        { keys: ['ashok', 'kumaresan', 'ashok kumaresan', 'genpact'], answer: '<b>Ashok Kumaresan</b> (Sr Engineer, Genpact) says: "As a Senior Development Manager, he consistently demonstrated exceptional leadership and a profound understanding of the .NET ecosystem. He has a remarkable track record of successfully delivering complex projects on schedule, while maintaining a collaborative and positive team environment."' },
        { keys: ['ankit', 'ankit jha', 'clarivate'], answer: '<b>Ankit Jha</b> (Sr Delivery Manager, Clarivate) says: "From the very beginning, Santosh stood out as one of the brightest minds among us. Over the past 13+ years, I have seen him grow into an innovative and creative professional. He has this rare ability to simplify complex challenges and bring clarity to situations that seem daunting to others."' },
        { keys: ['namratha', 'shurapali', 'namratha shurapali', 'honeywell'], answer: '<b>Namratha Shurapali</b> (Advanced SW Engineer, Honeywell) says: "At the core of his approach is a commitment to team empowerment and innovation. By leveraging the strengths of each team member, he has facilitated the successful launch of multiple products ahead of schedule and earned repeated client commendations for exceptional quality and delivery."' },
        { keys: ['nilesh', 'nilesh rathod'], answer: '<b>Nilesh Rathod</b> (Analyst, Tourism Saskatchewan) says: "I had the opportunity to work with Santhosh in Dubai on a government project. He is a sincere, hardworking, and highly skilled software engineer who always goes the extra mile. He has a strong command of technologies like .NET, Oracle, and SQL Server, and combines that technical expertise with excellent problem-solving skills."' },
        { keys: ['harsha', 'harsha s', 'cme group', 'cme'], answer: '<b>Harsha S</b> (Sr Security Reliability Engineer, CME Group) says: "He is an excellent team player and easy to work with and his abilities to think outside the box had helped our team to work on many solutions better. He will be great asset to any team."' },
        { keys: ['dilip', 'dilipkumar', 'dilipkumar d p', 'eli lilly', 'lilly'], answer: '<b>Dilipkumar D P</b> (Sr eCOA Specialist, Eli Lilly) says: "He is a hardworking, reliable, and dedicated individual. His positive attitude and strong commitment to his work always stand out. He is someone who takes responsibility seriously and consistently strives to deliver quality results. He is a very talented professional and a very kind hearted person."' },
        { keys: ['ashwini', 'javagal', 'ashwini javagal'], answer: '<b>Ashwini Javagal</b> (Sr SDE, TeamLease) says: "I strongly recommend Santhosh for his hard work, problem-solving ability, and supportive attitude. He has a sharp ability to analyze and solve complex problems, and he never gives up until the right solution is found. His positive mindset and motivating attitude make him a valuable team player."' },
        { keys: ['domain', 'industry', 'sector', 'field', 'vertical'], answer: 'Santhosh has delivered solutions across 6+ domains: Banking (CBA), HRTech & Staffing (TeamLease - 3,500+ clients), HealthTech & Clinical Trials (Clario - Abbott/AstraZeneca/Pfizer), Background Verification (Softtek/Sterling US), ERP & Payments (ATG Dubai - Mashreq/Mastercard), and Utilities (AGS/SEDC USA). Plus 15+ freelancing projects.' },
        { keys: ['whatsapp', 'social media'], answer: 'Follow the Creative Smart Tech WhatsApp channel at <a href="https://whatsapp.com/channel/0029VbCcBxWJf05lQvBem22R" target="_blank" rel="noopener noreferrer">this link</a> for tech updates.' },
        { keys: ['agile', 'scrum', 'sprint', 'methodology', 'process', 'git', 'linux', 'version control'], answer: 'Santhosh has 92% proficiency in Agile/Scrum methodologies. At TeamLease, he achieved 95% sprint goal success rate. He holds certifications in Agile Scrum Master, GIT Training, and Linux Training. He has led cross-functional teams using Scrum practices across multiple organizations.' },
        { keys: ['why hire', 'why should', 'why santhosh', 'what makes', 'unique', 'strength', 'strong point'], answer: 'Santhosh brings 13+ years across 6 domains, proven leadership (managing 15+ members), 34+ certifications, and a track record of measurable impact: 40% efficiency gains, 95% sprint success, 3,500+ clients served, and 3L+ daily users. He combines deep .NET/AWS/SQL expertise with strong team management and AI-driven innovation.' },
        { keys: ['availab', 'notice period', 'open to', 'looking for', 'opportunity', 'relocat'], answer: 'For availability and opportunity discussions, please reach out to Santhosh directly via the <a href="#contact" onclick="document.querySelector(\'#contact\').scrollIntoView({behavior:\'smooth\'});closeChatPanel();">contact form</a> or email santhuanand7@gmail.com.' },
        { keys: ['salary', 'ctc', 'compensation', 'package', 'married', 'age', 'hobby', 'hobbies', 'interest', 'personal', 'family', 'weakness'], answer: 'I can only answer questions related to Santhosh\'s professional background, skills, and experience. For personal discussions, please reach out directly via the <a href="#contact" onclick="document.querySelector(\'#contact\').scrollIntoView({behavior:\'smooth\'});closeChatPanel();">contact form</a>.' },
        { keys: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'greetings', 'howdy'], answer: 'Hello! I\'m Santhosh\'s virtual assistant. Ask me anything about his experience, skills, certifications, projects, linkedin articles and videos or how to get in touch.' },
        { keys: ['thank', 'thanks', 'bye', 'goodbye', 'see you', 'take care'], answer: 'You\'re welcome! Feel free to come back anytime. You can also reach Santhosh directly via the <a href="#contact" onclick="document.querySelector(\'#contact\').scrollIntoView({behavior:\'smooth\'});closeChatPanel();">contact form</a>.' },
        { keys: ['role', 'job', 'title', 'designation', 'position'], answer: 'Santhosh\'s current title is Engineering Manager at Commonwealth Bank of Australia. Previously: Senior Development Manager (TeamLease), Senior Software Engineer (Clario), Software Engineer (Softtek), Senior Software Developer Consultant (ATG Dubai), Software Engineer (AGS Infotech).' },
        { keys: ['website', 'site', 'page', 'section'], answer: 'This portfolio website has sections for: About Me, Professional Experience (6 roles), Technical Expertise (4 skill categories), Featured Projects (6 projects), Certifications & Education (34+ certs), Recommendations (8 testimonials), Thought Leadership (LinkedIn articles + YouTube videos), and a Contact form. There are also dedicated pages for <a href="articles.html">All LinkedIn Articles</a>, <a href="videos.html">All Videos</a>, and <a href="certificates.html">All Certifications</a>.' },
        { keys: ['all article', 'all post', 'articles page', 'linkedin page'], answer: 'The <a href="articles.html">All Articles page</a> shows all of Santhosh\'s LinkedIn posts covering technology, leadership, AI, cloud architecture, and more.' },
        { keys: ['all video', 'videos page', 'all tutorial'], answer: 'The <a href="videos.html">All Videos page</a> shows all videos from the Creative Smart Tech YouTube channel with tutorials, tech insights, and more.' },
        { keys: ['all cert', 'certificates page', 'view cert'], answer: 'The <a href="certificates.html">Certifications page</a> displays all 34+ certificates with PDF previews. You can filter by category: AWS, Azure, Google Cloud, Data & Analytics, DevOps, AI, and Others.' }
    ];

    var fallback = 'I don\'t have enough information to answer that. Please reach out to Santhosh directly via the <a href="#contact" onclick="document.querySelector(\'#contact\').scrollIntoView({behavior:\'smooth\'});closeChatPanel();">contact form</a> or email santhuanand7@gmail.com.';

    // Synonyms and word stems for smarter matching
    var synonyms = {
        'work': ['job', 'role', 'position', 'employ', 'company', 'current', 'working now'],
        'where': ['location', 'city', 'based', 'from', 'country', 'reside'],
        'skill': ['tech', 'stack', 'language', 'framework', 'tools', 'proficien', 'expert', 'good at', 'know'],
        'experience': ['year', 'career', 'history', 'background', 'journey', 'how long'],
        'education': ['degree', 'university', 'college', 'study', 'qualification', 'academic'],
        'contact': ['reach', 'email', 'phone', 'mobile', 'call', 'connect', 'message', 'talk', 'hire'],
        'certif': ['credential', 'course', 'training', 'certified'],
        'project': ['portfolio', 'built', 'delivered', 'product', 'developed'],
        'team': ['lead', 'manage', 'leadership', 'people', 'member', 'report'],
        'recommend': ['testimonial', 'review', 'feedback', 'reference', 'say about', 'opinion'],
        'video': ['youtube', 'channel', 'tutorial', 'watch', 'subscribe'],
        'article': ['linkedin', 'post', 'blog', 'write', 'read', 'follow'],
        'achieve': ['metric', 'impact', 'result', 'number', 'stat', 'accomplish'],
        'resume': ['cv', 'download', 'pdf', 'document']
    };

    function expandQuery(q) {
        var expanded = q;
        for (var base in synonyms) {
            if (q.includes(base)) {
                for (var i = 0; i < synonyms[base].length; i++) {
                    expanded += ' ' + synonyms[base][i];
                }
            }
            for (var j = 0; j < synonyms[base].length; j++) {
                if (q.includes(synonyms[base][j])) {
                    expanded += ' ' + base;
                    break;
                }
            }
        }
        return expanded;
    }

    function findAnswer(query) {
        var q = query.toLowerCase().trim();
        if (q.length < 2) return fallback;
        var expanded = expandQuery(q);
        var best = null, bestScore = 0;
        for (var i = 0; i < knowledge.length; i++) {
            var score = 0;
            for (var j = 0; j < knowledge[i].keys.length; j++) {
                var key = knowledge[i].keys[j];
                if (expanded.includes(key)) score += key.length;
            }
            // Also search within the answer text for direct matches
            var answerText = typeof knowledge[i].answer === 'string' ? knowledge[i].answer.toLowerCase() : '';
            var words = q.split(/\s+/);
            for (var w = 0; w < words.length; w++) {
                if (words[w].length > 3 && answerText.includes(words[w])) score += 1;
            }
            if (score > bestScore) { bestScore = score; best = knowledge[i]; }
        }
        return best ? (typeof best.answer === 'function' ? best.answer() : best.answer) : fallback;
    }

    var btn = document.createElement('button');
    btn.className = 'chatbot-toggle';
    btn.setAttribute('aria-label', 'Open chat assistant');
    btn.innerHTML = '<i class="fas fa-robot"></i>';

    var panel = document.createElement('div');
    panel.className = 'chatbot-panel';
    panel.innerHTML =
        '<div class="chatbot-header"><span>Ask me anything</span><button class="chatbot-close" aria-label="Close chat"><i class="fas fa-times"></i></button></div>' +
        '<div class="chatbot-messages" id="chatbotMessages"></div>' +
        '<div class="chatbot-input-wrap"><input type="text" id="chatbotInput" placeholder="Type your question..." autocomplete="off"><button class="chatbot-send" aria-label="Send message"><i class="fas fa-paper-plane"></i></button></div>';

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    var messages = panel.querySelector('#chatbotMessages');
    var input = panel.querySelector('#chatbotInput');
    var sendBtn = panel.querySelector('.chatbot-send');
    var closeBtn = panel.querySelector('.chatbot-close');
    var isOpen = false;

    function addMessage(text, isUser) {
        var div = document.createElement('div');
        div.className = 'chatbot-msg ' + (isUser ? 'chatbot-msg-user' : 'chatbot-msg-bot');
        if (isUser) div.textContent = text;
        else div.innerHTML = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function handleSend() {
        var q = input.value.trim();
        if (!q) return;
        addMessage(q, true);
        input.value = '';
        setTimeout(function () { addMessage(findAnswer(q), false); }, 400);
    }

    btn.addEventListener('click', function () {
        isOpen = !isOpen;
        panel.classList.toggle('open', isOpen);
        btn.classList.toggle('active', isOpen);
        btn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-robot"></i>';
        if (isOpen && messages.children.length === 0) {
            addMessage('Hi! I\'m Santhosh\'s virtual assistant. Ask me about his experience, skills, certifications, projects, linkedin articles and videos or how to get in touch.', false);
        }
        if (isOpen) input.focus();
    });

    closeBtn.addEventListener('click', function () {
        isOpen = false;
        panel.classList.remove('open');
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fas fa-robot"></i>';
    });

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') handleSend(); });

    window.closeChatPanel = function () {
        isOpen = false;
        panel.classList.remove('open');
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fas fa-robot"></i>';
    };
})();
