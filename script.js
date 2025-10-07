document.addEventListener('DOMContentLoaded', () => {

    // ==================================================================
    // 1. Mobile Menu Toggle (Functionality 1 from original file)
    // ==================================================================
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // ==================================================================
    // 2. Service Slider Logic (Functionality 2 from original file)
    // ==================================================================
    const services = [
        { title: "Tax Planning", icon: "💰", description: "Proactive tax strategies to minimize liability and maximize returns." },
        { title: "Tax Representation ", icon: "⚖️", description: "Professional representation before tax authorities and expert." },
        { title: "Financial Consulting", icon: "📊", description: "Data-driven advice for strategic growth and financial health." },
        { title: "Strategic Finance Planning", icon: "🧠", description: "High-level financial guidance without the cost of a full-time executive." },
        { title: "Assurance & Audit", icon: "🔍", description: "Independent verification to build trust and ensure compliance." },
        { title: "Payroll Management", icon: "💵", description: "Seamless, accurate, and compliant payroll processing services." },
        { title: "Startup Accounting", icon: "🚀", description: "Dedicated financial support tailored for fast-paced new ventures." },
        { title: "Business Registration ", icon: "📄", description: "Complete assistance with company incorporation, GST registration under Indian business laws." }
    ];

    const sliderTrack = document.getElementById('services-slider-track');
    const prevBtn = document.getElementById('prev-service-btn');
    const nextBtn = document.getElementById('next-service-btn');
    const dotContainer = document.getElementById('service-slider-dots');

    let currentSlide = 0;
    let slidesPerView = 1; 

    const updateSlidesPerView = () => {
        if (window.innerWidth >= 1024) { 
            slidesPerView = 4;
        } else if (window.innerWidth >= 640) { 
            slidesPerView = 2;
        } else { 
            slidesPerView = 1;
        }
        renderSlider();
        updateControls();
    };

    const renderSlider = () => {
        if (!sliderTrack) return;
        
        // 1. Render Cards
        sliderTrack.innerHTML = services.map(service => `
            <div class="card-width flex-shrink-0 p-4">
                <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-accent-blue h-full card-hover-effect text-left">
                    <span class="text-4xl block mb-3">${service.icon}</span>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">${service.title}</h3>
                    <p class="text-gray-600 text-sm">${service.description}</p>
                </div>
            </div>
        `).join('');
        
        // 2. Adjust Track Width
        sliderTrack.style.width = `${services.length * 100 / slidesPerView}%`;
        
        // 3. Render Dots
        if (dotContainer) {
            const totalDots = Math.ceil(services.length / slidesPerView);
            dotContainer.innerHTML = '';
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot', 'w-3', 'h-3', 'rounded-full', 'cursor-pointer', 'transition', 'mx-1');
                dot.classList.add(i === currentSlide ? 'bg-primary-blue' : 'bg-gray-300', 'hover:bg-primary-blue');
                dot.dataset.index = i;
                dot.addEventListener('click', () => moveToSlide(i));
                dotContainer.appendChild(dot);
            }
        }
        
        moveToSlide(currentSlide);
    };

    const moveToSlide = (index) => {
        if (!sliderTrack) return;
        const totalSlides = Math.ceil(services.length / slidesPerView);
        currentSlide = Math.min(Math.max(0, index), totalSlides - 1);
        const translateValue = -(currentSlide * (100 / (services.length / slidesPerView)));
        sliderTrack.style.transform = `translateX(${translateValue}%)`;
        updateControls();
    };

    const updateControls = () => {
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide >= Math.ceil(services.length / slidesPerView) - 1;
        
        document.querySelectorAll('#service-slider-dots .dot').forEach((dot, index) => {
            dot.classList.remove('bg-primary-blue', 'bg-gray-300');
            dot.classList.add(index === currentSlide ? 'bg-primary-blue' : 'bg-gray-300');
        });
    };

    if (prevBtn) prevBtn.addEventListener('click', () => moveToSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => moveToSlide(currentSlide + 1));
    window.addEventListener('resize', updateSlidesPerView);

    if (sliderTrack) updateSlidesPerView(); 


    // ==================================================================
    // 3. Scroll Animation (Fade-In) Logic (Functionality 3 from original file)
    // ==================================================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-show');
                observer.unobserve(entry.target);

                if (entry.target.querySelector('[data-animate]')) {
                    startCounters(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-init').forEach(el => {
        observer.observe(el);
    });

    // ==================================================================
    // 4. Counter Animation Logic (Functionality 4 from original file)
    // ==================================================================
    function startCounters(container) {
        container.querySelectorAll('[data-animate][data-count]').forEach(span => {
            const target = parseInt(span.dataset.count);
            let current = 0;
            const duration = 2000; 
            const startTime = performance.now();

            function updateCount(timestamp) {
                const elapsed = timestamp - startTime;
                const progress = Math.min(1, elapsed / duration);
                current = Math.floor(progress * target);
                span.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    span.textContent = target; 
                }
            }
            requestAnimationFrame(updateCount);
        });
    }

    // ==================================================================
    // 5. Footer Year Update (Functionality 5 from original file)
    // ==================================================================
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // ==================================================================
    // 6. Contact Form Submission (Conflict Resolution: Using GMAIL REDIRECT)
    // ==================================================================
    // NOTE: I am keeping the more advanced Gmail redirect logic, but 
    // you must change 'yourbusiness@gmail.com' to your actual email.
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            let name = document.getElementById("name")?.value || 'N/A';
            let email = document.getElementById("email")?.value || 'N/A';
            let service = document.getElementById("service")?.value || 'General Inquiry';
            let message = document.getElementById("message")?.value || 'No message provided.';

            let subject = encodeURIComponent("New Inquiry: " + service);
            let body = encodeURIComponent(
                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Service: " + service + "\n\n" +
                "Message:\n" + message
            );

/// change gmail here
            window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=ata.kdy2022@gmail.com&su=${subject}&body=${body}`;
        });
    }

    // ==================================================================
    // 7. Modal Functionality Setup (Functionality added in previous step)
    // ==================================================================
    
    // Detailed Service Data for Modal
    const servicesData = [
        { id: 1, title: "Monthly Bookkeeping", description: "We handle all your transactional recording, ensuring every expense and income is accurately categorized and posted. This forms the essential foundation for all financial reporting and tax compliance.", features: ["Transaction Categorization", "Bank & Credit Card Reconciliation", "Monthly Financial Closings", "Cloud-Based Platform Access"] },
        { id: 2, title: "Financial Reporting", description: "Receive timely and professional financial statements, including Income Statements, Balance Sheets, and Statement of Cash Flows. We help you interpret these reports to understand your business health.", features: ["Custom Report Generation", "Monthly/Quarterly Reporting Packages", "Key Performance Indicator (KPI) Tracking", "Financial Statement Analysis"] },
        { id: 3, title: "Payroll Management", description: "Streamline your payroll with our full-service solution. We manage employee payments, direct deposits, tax withholdings, and all necessary state and federal filings, keeping you compliant.", features: ["W-2 and 1099 Preparation", "Direct Deposit Integration", "Payroll Tax Filing & Remittance", "Time-Off Tracking Support"] },
        { id: 4, title: "AR/AP Management", description: "Optimize your cash flow by letting us manage your accounts receivable (invoicing/collections) and accounts payable (vendor bill payments) processes.", features: ["Vendor Bill Entry & Scheduling", "Client Invoicing", "Aged Receivables/Payables Reporting", "Expense Management Integration"] },
        { id: 5, title: "Accounting Software Setup", description: "We help you select, set up, and customize the perfect modern accounting software (e.g., QuickBooks Online, Xero) to meet your business's unique needs and integrate with other systems.", features: ["Software Selection Consultation", "Chart of Accounts Design", "Initial Data Migration", "User Training and Support"] },
        { id: 6, title: "Historical Cleanup", description: "If your books are months or years behind, we perform a detailed historical cleanup to reconcile past discrepancies, ensure accuracy, and prepare you for accurate tax filings.", features: ["Catch-up Bookkeeping", "Error Correction and Journal Entries", "Tax Document Preparation for Prior Years", "Discrepancy Resolution"] },
        { id: 7, title: "Inventory Tracking", description: "Implement sophisticated inventory management systems to accurately value your stock, track COGS, and manage purchasing, optimizing your margins and minimizing waste.", features: ["FIFO/LIFO/Average Costing Setup", "Integration with Sales Channels", "Periodic Inventory Reconciliations", "Stock Level Alerts"] },
        { id: 8, title: "Fixed Asset Management", description: "We manage the lifecycle of your long-term assets, accurately calculating depreciation, maintaining asset registers, and ensuring compliance with GAAP/IFRS standards.", features: ["Asset Tagging and Tracking", "Depreciation Schedule Management", "Disposal and Sale Tracking", "Tax-Optimized Depreciation Methods"] },
        { id: 9, title: "Corporate Tax Preparation", description: "We prepare and file all necessary federal and state corporate income tax returns (Forms 1120, 1120-S, 1065) with a focus on compliance and minimizing your tax burden.", features: ["Federal and State Tax Filings", "Corporate Tax Return Preparation", "Multi-State Apportionment", "K-1 Preparation and Distribution"] },
        { id: 10, title: "Individual Tax Filing", description: "Expert preparation of personal income tax returns (Form 1040), ensuring all deductions and credits are maximized while maintaining full IRS compliance.", features: ["Personal Income Tax Review", "Deduction and Credit Maximization", "Electronic Filing (E-File)", "Tax Projection Estimates"] },
        { id: 11, title: "Tax Planning & Strategy", description: "Year-round strategic consulting to proactively structure your business and personal finances to legally reduce your overall tax liability.", features: ["Quarterly Strategy Sessions", "Business Structure Review", "Retirement Contribution Optimization", "Tax Law Updates and Impact Analysis"] },
        { id: 12, title: "Sales Tax Compliance", description: "Navigate the complex landscape of sales tax. We handle registration, nexus determination, calculation, and timely filing in required jurisdictions.", features: ["Nexus Study and Determination", "Multi-State Registration", "Automated Sales Tax Calculation Setup", "Monthly/Quarterly Sales Tax Filing"] },
        { id: 13, title: "Audit Representation", description: "If you receive a notice from the IRS or state tax authorities, our CPAs provide professional representation and guidance to resolve the issue effectively.", features: ["IRS Communication Handling", "Document Preparation for Audit", "Correspondence Audit Support", "Appeal and Litigation Support (as necessary)"] },
        { id: 14, title: "Estimated Tax Payments", description: "Accurately calculate and schedule your federal and state quarterly estimated tax payments to avoid penalties and manage cash flow effectively.", features: ["Quarterly Income Projection", "Penalty Avoidance Strategy", "Federal and State Estimate Forms", "Payment Reminders and Scheduling"] },
        { id: 15, title: "International Tax Consulting", description: "Specialized advice for U.S. businesses with foreign income or operations, including FBAR (FinCEN Form 114) and other complex international reporting requirements.", features: ["FBAR and FATCA Compliance", "Foreign Income Tax Strategy", "Treaty Analysis", "Expatriate Tax Services"] },
        { id: 16, title: "Financial Forecasting", description: "Develop detailed financial models to project future revenues, expenses, and capital requirements. Essential for strategic planning and securing financing.", features: ["3-Year Financial Models", "Scenario Planning (Best/Worst Case)", "Budget vs. Actual Variance Reporting", "Capital Expenditure Forecasting"] },
        { id: 17, title: "Business Valuation", description: "Determine the fair market value of your business for purposes of sale, acquisition, partnership changes, or estate planning, delivered through a formal report.", features: ["Valuation Methodologies (DCF, Multiples)", "Formal Valuation Report", "Exit Strategy Consulting", "Due Diligence Support"] },
        { id: 18, title: "Budgeting & Analysis", description: "Create robust annual operating budgets and provide continuous analysis to track performance against the budget, identifying areas for cost control and improvement.", features: ["Departmental Budget Creation", "Rolling Forecasts", "Variance Analysis Reporting", "Profitability Analysis by Service/Product"] },
        { id: 19, title: "Strategic Business Planning", description: "High-level advisory services focused on long-term strategy, including market entry, expansion, debt structuring, and organizational efficiency.", features: ["Goal Setting Workshops", "Competitive Analysis Integration", "Organizational Structure Review", "KPI Development and Monitoring"] },
        { id: 20, title: "Cash Flow Optimization", description: "Implement strategies to improve the timing of cash inflows and outflows, ensuring your business has the necessary liquidity for growth and operations.", features: ["Working Capital Analysis", "AR/AP Cycle Improvement", "Line of Credit Negotiation Support", "Short-Term Cash Flow Projection"] },
        { id: 21, title: "Entity Structuring", description: "Consultation on the optimal legal structure for your new or growing business (LLC, S-Corp, C-Corp, Partnership) to maximize liability protection and tax efficiency.", features: ["Legal Entity Comparison", "New Business Registration Guidance", "State Filing Requirements", "Conversion Strategy (e.g., LLC to S-Corp)"] },
        { id: 22, title: "Technology Integration", description: "Assist with connecting your accounting platform to your CRM, E-commerce, or other operational software, creating a seamless and automated financial workflow.", features: ["API Integration Setup", "Data Sync Troubleshooting", "Automated Workflow Design", "Security and Access Control Review"] },
        { id: 23, title: "Mergers & Acquisitions", description: "Provide financial due diligence, deal structuring, and post-merger integration support for both buyers and sellers of small and medium-sized businesses.", features: ["Financial Due Diligence", "Quality of Earnings Review", "Transaction Support", "Post-Acquisition Integration"] },
        { id: 24, title: "Cost Segregation Studies", description: "For commercial real estate owners, we perform specialized studies to reclassify property components, accelerating depreciation deductions and significantly lowering current tax liability.", features: ["Engineering-Based Study", "Accelerated Depreciation Schedules", "Compliance with IRS Guidelines", "Large Tax Savings Opportunity"] },
    ];

    const serviceCards = document.querySelectorAll('.service-card');
    const modal = document.getElementById('service-modal');
    const closeModalButton = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalFeatures = document.getElementById('modal-features');

    const openModal = (serviceId) => {
        const service = servicesData.find(s => s.id === parseInt(serviceId));
        
        if (service) {
            modalTitle.textContent = service.title;
            modalDescription.textContent = service.description;
            
            modalFeatures.innerHTML = '';
            service.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                modalFeatures.appendChild(li);
            });

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; 
        }
    };

    const closeAllModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; 
    };

    // 1. Click Listener for Service Cards
    serviceCards.forEach(card => {
        card.addEventListener('click', (event) => {
            const serviceId = event.currentTarget.getAttribute('data-service-id');
            openModal(serviceId);
        });
    });

    // 2. Click Listener for Close Button (X icon)
    if (closeModalButton) closeModalButton.addEventListener('click', closeAllModal);

    // 3. Click Listener for Modal Overlay
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeAllModal();
            }
        });
    }

    // 4. Keyboard Listener for Escape Key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeAllModal();
        }
    });
});

// ==================================================================
// 8. Scroll Text Animation (Separate from DOMContentLoaded as it references an undeclared element)
// ==================================================================
// This code needs to be removed or have its HTML element (scrollText) 
// and necessary CSS (perspective) defined for it to work. 
// I'm omitting it as it seems unrelated to the core site functionality and is causing errors.
//
// const text = document.getElementById("scrollText");
// window.addEventListener("scroll", () => {
//     let scrollY = window.scrollY;
//     text.style.transform = `translateZ(${scrollY - 500}px) rotateX(${45 - scrollY / 20}deg)`;
// });


