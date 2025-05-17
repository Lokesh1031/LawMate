
export interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    nextQuestionId?: string;
    guideId?: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  guideIds: string[];
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  steps: {
    title: string;
    content: string;
  }[];
  relatedDocumentIds: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  templateText: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Initial Questions for Questionnaire
export const questions: Question[] = [
  {
    id: "q1",
    text: "What type of legal issue are you dealing with?",
    options: [
      { id: "o1", text: "Family matters (divorce, custody, etc.)", nextQuestionId: "q2" },
      { id: "o2", text: "Housing or property issues", nextQuestionId: "q3" },
      { id: "o3", text: "Employment problems", nextQuestionId: "q4" },
      { id: "o4", text: "Contract disputes", nextQuestionId: "q5" },
      { id: "o5", text: "Other legal issues", nextQuestionId: "q6" }
    ]
  },
  {
    id: "q2",
    text: "What specific family law matter do you need help with?",
    options: [
      { id: "o6", text: "Divorce or separation", guideId: "g1" },
      { id: "o7", text: "Child custody or support", guideId: "g2" },
      { id: "o8", text: "Adoption", guideId: "g3" },
      { id: "o9", text: "Domestic violence protection", guideId: "g4" }
    ]
  },
  {
    id: "q3",
    text: "What type of housing or property issue are you facing?",
    options: [
      { id: "o10", text: "Landlord-tenant dispute", guideId: "g5" },
      { id: "o11", text: "Property boundary issues", guideId: "g6" },
      { id: "o12", text: "Real estate transaction problems", guideId: "g7" },
      { id: "o13", text: "Eviction", guideId: "g8" }
    ]
  },
  {
    id: "q4",
    text: "What employment issue are you dealing with?",
    options: [
      { id: "o14", text: "Wrongful termination", guideId: "g9" },
      { id: "o15", text: "Workplace discrimination", guideId: "g10" },
      { id: "o16", text: "Unpaid wages", guideId: "g11" },
      { id: "o17", text: "Hostile work environment", guideId: "g12" }
    ]
  },
  {
    id: "q5",
    text: "What type of contract issue do you have?",
    options: [
      { id: "o18", text: "Breach of contract", guideId: "g13" },
      { id: "o19", text: "Contract review before signing", guideId: "g14" },
      { id: "o20", text: "Contract termination", guideId: "g15" },
      { id: "o21", text: "Service agreement dispute", guideId: "g16" }
    ]
  },
  {
    id: "q6",
    text: "Please select the area that best describes your legal issue:",
    options: [
      { id: "o22", text: "Small claims court", guideId: "g17" },
      { id: "o23", text: "Traffic violations", guideId: "g18" },
      { id: "o24", text: "Personal injury", guideId: "g19" },
      { id: "o25", text: "Estate planning", guideId: "g20" }
    ]
  }
];

// Categories
export const categories: Category[] = [
  {
    id: "family",
    name: "Family Law",
    description: "Legal matters related to family relationships, including divorce, custody, and adoption.",
    icon: "Home",
    guideIds: ["g1", "g2", "g3", "g4"]
  },
  {
    id: "housing",
    name: "Housing & Property",
    description: "Legal issues related to housing, landlord-tenant relationships, and property ownership.",
    icon: "Home",
    guideIds: ["g5", "g6", "g7", "g8"]
  },
  {
    id: "employment",
    name: "Employment",
    description: "Legal matters in the workplace, including termination, discrimination, and wages.",
    icon: "Briefcase",
    guideIds: ["g9", "g10", "g11", "g12"]
  },
  {
    id: "contracts",
    name: "Contracts",
    description: "Issues related to agreements between parties, including breaches and disputes.",
    icon: "FileText",
    guideIds: ["g13", "g14", "g15", "g16"]
  },
  {
    id: "other",
    name: "Other Legal Matters",
    description: "Additional legal issues including small claims, traffic violations, and estate planning.",
    icon: "HelpCircle",
    guideIds: ["g17", "g18", "g19", "g20"]
  }
];

// Guides (detailed step-by-step instructions)
export const guides: Guide[] = [
  {
    id: "g1",
    title: "How to File for Divorce",
    description: "A comprehensive guide to navigating the divorce process yourself.",
    category: "family",
    steps: [
      {
        title: "Determine Your Eligibility",
        content: "Before filing for divorce, ensure you meet the residency requirements of your state. Typically, you must have lived in the state for 3-12 months. Check your local court website for specific requirements."
      },
      {
        title: "Complete the Initial Divorce Papers",
        content: "Obtain the necessary divorce petition forms from your local courthouse or their website. These typically include a Petition for Dissolution of Marriage and a Summons. Fill them out completely and accurately."
      },
      {
        title: "File the Papers with the Court",
        content: "Take your completed forms to the clerk of the court in your county. You will need to pay a filing fee (typically $100-$400). If you cannot afford the fee, ask about fee waiver applications."
      },
      {
        title: "Serve Your Spouse with the Divorce Papers",
        content: "Your spouse must legally receive copies of the filed papers. This is called 'service of process.' You cannot serve the papers yourself; use a sheriff, process server, or in some jurisdictions, certified mail."
      },
      {
        title: "Wait for a Response",
        content: "Your spouse typically has 20-30 days to respond to the divorce petition. If they don't respond, you may be able to proceed with a default divorce. If they contest the divorce, you may need mediation or a hearing."
      },
      {
        title: "Complete Financial Disclosures",
        content: "Both parties must provide complete information about their income, expenses, assets, and debts. These financial affidavits are mandatory, even in uncontested divorces."
      },
      {
        title: "Negotiate a Settlement",
        content: "If possible, work with your spouse to agree on issues like property division, child custody, and support. Mediation services are often available through the court if direct negotiation is difficult."
      },
      {
        title: "Attend the Court Hearing",
        content: "Most courts require at least one hearing even for uncontested divorces. Dress professionally, bring all your documents, and be prepared to answer the judge's questions about your agreement."
      },
      {
        title: "Obtain the Final Divorce Decree",
        content: "After the judge approves your divorce agreement, they will sign the divorce decree. Get certified copies of this important document for your records and for changing your name or other official purposes."
      }
    ],
    relatedDocumentIds: ["d1", "d2", "d3"],
    faqs: [
      {
        question: "How long does a divorce typically take?",
        answer: "The timeline varies by state and complexity. Uncontested divorces can be completed in as little as 1-3 months in some states, while contested divorces may take a year or longer."
      },
      {
        question: "Do I need a lawyer to get divorced?",
        answer: "While not legally required, a lawyer is advisable for complex situations involving significant assets, businesses, disputed custody, or if your spouse has hired an attorney. For simple, uncontested divorces, self-representation is more feasible."
      },
      {
        question: "What is the difference between legal separation and divorce?",
        answer: "Legal separation means you remain married but live apart with court orders regarding finances and children. Divorce legally ends the marriage. Some people choose separation for religious reasons or to maintain health insurance benefits."
      }
    ]
  },
  {
    id: "g5",
    title: "Dealing with Landlord-Tenant Disputes",
    description: "How to address and resolve issues with your landlord or tenant legally.",
    category: "housing",
    steps: [
      {
        title: "Review Your Lease Agreement",
        content: "Carefully read your lease to understand your rights and responsibilities. The lease is a legally binding contract that outlines terms for rent, maintenance, rules, and procedures for ending the tenancy."
      },
      {
        title: "Document the Issue",
        content: "Keep detailed records of the problem, including dates, descriptions, photographs, and any communication with your landlord. This documentation will be crucial if you need to escalate the matter."
      },
      {
        title: "Communicate in Writing",
        content: "Send a clear, factual letter to your landlord describing the issue and requesting resolution. Send it by certified mail or email to create a record. Include relevant lease clauses and reasonable deadlines for response."
      },
      {
        title: "Research Tenant Rights in Your Area",
        content: "Local and state laws often provide specific protections for tenants. Research tenant rights organizations, housing codes, and legal resources specific to your location to understand your options."
      },
      {
        title: "Consider Mediation",
        content: "Many communities offer free or low-cost mediation services for landlord-tenant disputes. A neutral third party can help facilitate communication and reach a resolution without going to court."
      },
      {
        title: "Explore Legal Remedies",
        content: "If direct communication and mediation fail, you may have legal options such as withholding rent (in an escrow account), repairing and deducting costs, or breaking the lease without penalty. Requirements for these actions vary by location."
      },
      {
        title: "File a Complaint with Housing Authorities",
        content: "For serious code violations, you can file a complaint with local housing authorities or health departments. They can inspect the property and may issue orders for repairs or corrections."
      },
      {
        title: "Consider Small Claims Court",
        content: "For disputes involving money (security deposits, damages, etc.), small claims court offers a relatively simple process without needing an attorney. Claim limits vary by state, typically between $3,000-$10,000."
      },
      {
        title: "Know When to Seek Legal Help",
        content: "For complex situations, discrimination cases, or eviction proceedings, consult with a tenant rights attorney. Many provide free consultations or have sliding scale fees based on income."
      }
    ],
    relatedDocumentIds: ["d4", "d5", "d6"],
    faqs: [
      {
        question: "Can my landlord enter my apartment without permission?",
        answer: "Most states require landlords to give notice (typically 24-48 hours) before entering, except in emergencies. Check your local laws and lease for specific requirements."
      },
      {
        question: "How can I get my security deposit back?",
        answer: "When moving out, clean thoroughly, document the condition with photos/video, and request a walk-through with your landlord. Most states require landlords to return deposits within 14-30 days with an itemized list of any deductions."
      },
      {
        question: "What should I do if I receive an eviction notice?",
        answer: "Don't ignore it! Read it carefully to understand the reason and timeline. You may have options to cure the problem (like paying overdue rent) or to contest the eviction. Seek legal assistance immediately as eviction timelines are often very short."
      }
    ]
  },
  {
    id: "g9",
    title: "Understanding Wrongful Termination",
    description: "Learn about your rights and potential remedies if you believe you've been wrongfully terminated.",
    category: "employment",
    steps: [
      {
        title: "Determine If You're an At-Will Employee",
        content: "Most employees in the US are 'at-will,' meaning employers can terminate employment for any legal reason. However, exceptions exist based on contracts, discrimination laws, and public policy."
      },
      {
        title: "Identify Potential Legal Violations",
        content: "Termination may be wrongful if it violates anti-discrimination laws (based on race, gender, religion, etc.), is retaliation for protected activities (like whistleblowing or filing a complaint), or breaches an employment contract."
      },
      {
        title: "Gather Documentation",
        content: "Collect all relevant documents: employment contract, performance reviews, communications about your termination, employee handbook, and any evidence of discrimination or retaliation."
      },
      {
        title: "Request Your Personnel File",
        content: "Many states give employees the right to access their personnel files. Submit a written request to obtain yours, which may contain valuable information about the reasons for termination."
      },
      {
        title: "File for Unemployment Benefits",
        content: "Apply for unemployment benefits immediately, even if you were fired. If your employer contests your claim, the unemployment hearing can provide insights into their official reason for termination."
      },
      {
        title: "Consider Filing a Discrimination Complaint",
        content: "If discrimination was involved, file a complaint with the Equal Employment Opportunity Commission (EEOC) or your state's fair employment agency. There are strict time limits, typically 180-300 days from the termination."
      },
      {
        title: "Evaluate Settlement Options",
        content: "Before filing a lawsuit, consider negotiating a severance agreement or settlement. This might include extended benefits, a positive or neutral reference, and financial compensation."
      },
      {
        title: "Consult with an Employment Attorney",
        content: "Many employment lawyers offer free initial consultations and may work on contingency fees (taking a percentage of any settlement). Bring all your documentation to get an assessment of your case."
      },
      {
        title: "Prepare for Potential Litigation",
        content: "If you decide to pursue a lawsuit, be prepared for a lengthy process. Cases can take 1-3 years and involve depositions, discovery of documents, and potentially a trial."
      }
    ],
    relatedDocumentIds: ["d7", "d8"],
    faqs: [
      {
        question: "What is considered wrongful termination?",
        answer: "Termination that violates employment contracts, anti-discrimination laws, whistleblower protections, or public policy. It's not just unfair treatment but must involve a specific legal violation."
      },
      {
        question: "How long do I have to file a wrongful termination claim?",
        answer: "Deadlines vary by claim type and location. Discrimination claims typically must be filed with the EEOC within 180-300 days. State law claims may have 1-3 year statutes of limitations."
      },
      {
        question: "What kinds of damages can I recover in a wrongful termination case?",
        answer: "Potential damages include back pay (wages lost since termination), front pay (future lost wages), emotional distress damages, attorney's fees, and in egregious cases, punitive damages designed to punish the employer."
      }
    ]
  },
  {
    id: "g13",
    title: "Handling Breach of Contract Issues",
    description: "Steps to take when dealing with a contract violation or breach.",
    category: "contracts",
    steps: [
      {
        title: "Identify the Breach",
        content: "Determine exactly how the contract was violated. Material breaches (substantial violations that undermine the agreement) generally provide more remedies than minor breaches (technicalities that don't significantly affect performance)."
      },
      {
        title: "Review the Contract Thoroughly",
        content: "Carefully read the entire contract, paying special attention to clauses regarding breach remedies, dispute resolution, notice requirements, and any time limitations for making claims."
      },
      {
        title: "Document the Breach",
        content: "Gather all evidence related to the breach, including the contract itself, communications, financial records, timelines of events, photographs, and any other relevant documentation."
      },
      {
        title: "Provide Formal Notice",
        content: "Many contracts require written notice of breach with an opportunity to cure (fix) the problem. Send a clear breach notification letter by certified mail, detailing the violation and your expected remedy."
      },
      {
        title: "Consider Alternative Dispute Resolution",
        content: "Check if your contract requires mediation or arbitration before litigation. Even if not required, these options are often faster and less expensive than court proceedings."
      },
      {
        title: "Calculate Your Damages",
        content: "Determine what losses the breach has caused you. Typical damages include direct costs, lost profits, costs to remedy the breach, or in some cases, the benefit you would have received from full performance."
      },
      {
        title: "Explore Settlement Options",
        content: "Consider negotiating directly with the other party. A reasonable settlement offer might include partial payment, extended deadlines, modified performance, or other accommodations that satisfy both parties."
      },
      {
        title: "Prepare for Small Claims Court",
        content: "For disputes below your state's small claims limit (typically $3,000-$10,000), small claims court offers a streamlined process without attorneys. Prepare a concise presentation with clear evidence."
      },
      {
        title: "Consider Civil Court Action",
        content: "For larger disputes, you may need to file a lawsuit in civil court. The process includes filing a complaint, serving the defendant, going through discovery (information exchange), and potentially trial."
      }
    ],
    relatedDocumentIds: ["d9", "d10"],
    faqs: [
      {
        question: "What's the difference between a material and minor breach?",
        answer: "A material breach substantially affects the value of the contract and may allow the injured party to terminate the contract and seek damages. A minor breach still requires compensation but doesn't typically justify terminating the entire contract."
      },
      {
        question: "How long do I have to take action for breach of contract?",
        answer: "The statute of limitations varies by state and type of contract, typically ranging from 3-10 years. Written contracts generally have longer periods than verbal agreements. Check your state's specific timeframes."
      },
      {
        question: "What remedies are available for breach of contract?",
        answer: "Common remedies include compensatory damages (money to cover losses), specific performance (court order requiring the promised action), cancellation (terminating the contract), or restitution (returning payments or property)."
      }
    ]
  }
];

// Documents (templates)
export const documents: Document[] = [
  {
    id: "d1",
    title: "Divorce Petition",
    description: "Initial document to file for divorce proceedings.",
    category: "family",
    templateText: `IN THE CIRCUIT COURT OF [COUNTY] COUNTY, [STATE]
    
    IN RE THE MARRIAGE OF:
    [YOUR FULL NAME],
    Petitioner,
    
    and
    
    [SPOUSE'S FULL NAME],
    Respondent.
    
    Case No. ____________
    
    PETITION FOR DISSOLUTION OF MARRIAGE
    
    COMES NOW the Petitioner, [YOUR FULL NAME], and petitions this Court for a dissolution of marriage from the Respondent, [SPOUSE'S FULL NAME], and in support thereof states:
    
    1. Petitioner resides at [YOUR ADDRESS], [CITY], [STATE], and has been a resident of [STATE] for at least [STATE REQUIREMENT] months prior to the filing of this Petition.
    
    2. Respondent resides at [SPOUSE'S ADDRESS], [CITY], [STATE].
    
    3. The parties were married on [DATE OF MARRIAGE] in [CITY, STATE OF MARRIAGE].
    
    4. The parties separated on or about [DATE OF SEPARATION].
    
    5. The marriage is irretrievably broken and there is no reasonable likelihood that the marriage can be preserved.
    
    6. [LIST CHILDREN IF ANY: The following children were born of this marriage: [CHILD'S NAME], born [CHILD'S DOB]; [ADDITIONAL CHILDREN].]
    
    [OR]
    
    6. There were no children born of this marriage.
    
    7. Petitioner believes that Respondent [IS/IS NOT] pregnant.
    
    8. Petitioner requests that this Court:
       a. Dissolve the marriage between Petitioner and Respondent;
       b. Make a fair and equitable division of the marital property and debts;
       c. [IF APPLICABLE: Establish custody, parenting time, and child support for the minor children];
       d. [IF APPLICABLE: Award spousal maintenance to Petitioner];
       e. [IF APPLICABLE: Restore Petitioner's former name to [FORMER NAME]].
    
    WHEREFORE, Petitioner prays that this Court grant a Decree of Dissolution of Marriage and for such other relief as the Court deems just and proper.
    
    Respectfully submitted,
    
    ______________________
    [YOUR FULL NAME], Petitioner
    [YOUR ADDRESS]
    [YOUR PHONE NUMBER]
    [YOUR EMAIL]`
  },
  {
    id: "d2",
    title: "Child Custody Agreement",
    description: "Document outlining custody arrangements for children.",
    category: "family",
    templateText: `CHILD CUSTODY AND PARENTING PLAN AGREEMENT
    
    This Child Custody and Parenting Plan Agreement ("Agreement") is entered into on [DATE] by and between:
    
    [PARENT 1 FULL NAME], residing at [ADDRESS] ("Parent 1")
    
    and
    
    [PARENT 2 FULL NAME], residing at [ADDRESS] ("Parent 2")
    
    WHEREAS, the parties are the parents of the following minor child(ren):
    
    1. [CHILD 1 NAME], born [DOB]
    2. [CHILD 2 NAME], born [DOB]
    3. [ADD ADDITIONAL CHILDREN AS NEEDED]
    
    WHEREAS, the parties wish to establish a parenting plan that serves the best interests of their child(ren);
    
    NOW, THEREFORE, the parties agree as follows:
    
    1. LEGAL CUSTODY
    
       [CHOOSE ONE:]
       □ Joint Legal Custody: Both parents will share decision-making rights, responsibilities, and authority relating to the health, education, and welfare of the child(ren). Both parents must confer with one another and attempt to reach an agreement on major decisions.
       
       □ Sole Legal Custody: [PARENT NAME] shall have sole legal custody of the child(ren) and shall be responsible for making major decisions regarding the child(ren)'s health, education, and welfare.
    
    2. PHYSICAL CUSTODY AND PARENTING TIME
    
       [CHOOSE ONE:]
       □ Joint Physical Custody: The child(ren) will reside with each parent according to the schedule outlined below, with both parents having significant periods of physical custody.
       
       □ Primary Physical Custody: [PARENT NAME] shall have primary physical custody, and [PARENT NAME] shall have parenting time as outlined below.
    
       Regular Parenting Schedule:
       [CLEARLY OUTLINE THE REGULAR WEEKLY/BIWEEKLY SCHEDULE]
       
       Holiday and Special Occasion Schedule:
       [OUTLINE ARRANGEMENTS FOR HOLIDAYS, BIRTHDAYS, SCHOOL BREAKS, ETC.]
       
       Summer/School Break Schedule:
       [OUTLINE ARRANGEMENTS FOR EXTENDED SCHOOL BREAKS]
    
    3. TRANSPORTATION
       [SPECIFY WHO IS RESPONSIBLE FOR TRANSPORTATION TO/FROM EXCHANGES]
    
    4. COMMUNICATION
       a. Between Parents: [SPECIFY HOW PARENTS WILL COMMUNICATE ABOUT THE CHILDREN]
       b. With Children: [SPECIFY HOW THE NON-CUSTODIAL PARENT MAY COMMUNICATE WITH THE CHILDREN]
    
    5. MODIFICATION
       This Agreement may be modified by mutual written agreement of the parties or by court order.
    
    6. DISPUTE RESOLUTION
       In the event of disagreements regarding this Agreement, the parties agree to:
       [SPECIFY MEDIATION OR OTHER DISPUTE RESOLUTION MECHANISM]
    
    7. RELOCATION
       Neither parent shall relocate with the child(ren) more than [X MILES/KILOMETERS] from their current residence without written agreement of the other parent or court approval.
    
    IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.
    
    ______________________________
    [PARENT 1 NAME]
    
    ______________________________
    [PARENT 2 NAME]`
  },
  {
    id: "d4",
    title: "Notice of Lease Violation to Landlord",
    description: "Formal notice to a landlord regarding a lease violation.",
    category: "housing",
    templateText: `[YOUR NAME]
    [YOUR ADDRESS]
    [CITY, STATE ZIP]
    [YOUR PHONE NUMBER]
    [YOUR EMAIL]
    
    [DATE]
    
    [LANDLORD/PROPERTY MANAGEMENT COMPANY NAME]
    [LANDLORD'S ADDRESS]
    [CITY, STATE ZIP]
    
    RE: Notice of Lease Violation at [YOUR RENTAL ADDRESS]
    
    Dear [LANDLORD/PROPERTY MANAGER NAME]:
    
    I am writing to formally notify you of a lease violation at my rental property located at [YOUR RENTAL ADDRESS]. According to our lease agreement dated [LEASE DATE], you are responsible for [STATE THE OBLIGATION FROM THE LEASE].
    
    However, the following issue(s) currently exist at the property:
    
    [DESCRIBE THE PROBLEM(S) IN DETAIL, INCLUDING:
    - When the issue began
    - Any previous attempts to notify the landlord
    - How the issue affects habitability or your ability to use the premises
    - Any evidence you have (photos, videos, witness statements)]
    
    This condition violates [SPECIFY CLAUSE(S) FROM YOUR LEASE AGREEMENT AND/OR RELEVANT LOCAL HOUSING CODES OR LAWS].
    
    I am requesting that you remedy this situation by taking the following action(s):
    
    [LIST THE SPECIFIC ACTIONS YOU WANT THE LANDLORD TO TAKE]
    
    Please address this issue within [NUMBER OF DAYS - typically 14-30 days depending on severity] days of receipt of this notice, or by [SPECIFIC DATE].
    
    If the issue is not resolved by this date, I may exercise my legal remedies, which may include:
    
    [LIST APPLICABLE REMEDIES BASED ON YOUR LOCAL LAW, SUCH AS:
    - Withholding rent
    - Repairing and deducting the cost from rent
    - Breaking the lease without penalty
    - Filing a complaint with local housing authorities
    - Seeking legal action]
    
    I hope we can resolve this matter promptly and amicably. Please contact me at [YOUR PHONE NUMBER] or [YOUR EMAIL] to discuss this issue or to arrange a time to make the necessary repairs.
    
    Thank you for your attention to this matter.
    
    Sincerely,
    
    [YOUR SIGNATURE]
    
    [YOUR PRINTED NAME]
    
    cc: [ANYONE ELSE YOU'RE SENDING A COPY TO]
    
    Enclosures: [LIST ANY DOCUMENTS YOU'RE ATTACHING, SUCH AS PHOTOGRAPHS, INSPECTION REPORTS, ETC.]`
  },
  {
    id: "d7",
    title: "EEOC Discrimination Complaint",
    description: "Template for filing a discrimination complaint with the EEOC.",
    category: "employment",
    templateText: `CHARGE OF DISCRIMINATION
    
    This form is affected by the Privacy Act of 1974; see Privacy Act Statement before completing this form.
    
    EQUAL EMPLOYMENT OPPORTUNITY COMMISSION
    
    Name (Indicate Mr., Ms., Mrs.): [YOUR FULL NAME]
    
    Home Phone: [YOUR PHONE NUMBER]    Date of Birth: [YOUR DOB]
    
    Street Address: [YOUR ADDRESS]
    
    City, State, and Zip Code: [CITY, STATE ZIP]
    
    Named is the Employer, Labor Organization, Employment Agency, Apprenticeship Committee, State or Local Government Agency Who Discriminated Against Me:
    
    Name: [EMPLOYER NAME]    Number of Employees: [APPROXIMATE NUMBER]
    
    Street Address: [EMPLOYER ADDRESS]
    
    City, State, and Zip Code: [EMPLOYER CITY, STATE ZIP]    Phone: [EMPLOYER PHONE NUMBER]
    
    DISCRIMINATION BASED ON (Check appropriate box(es)):
    [ ] RACE   [ ] COLOR   [ ] SEX   [ ] RELIGION   [ ] NATIONAL ORIGIN
    [ ] RETALIATION   [ ] AGE   [ ] DISABILITY   [ ] GENETIC INFORMATION
    [ ] OTHER (Specify): ____________
    
    DATE(S) DISCRIMINATION TOOK PLACE:
    Earliest: [DATE]    Latest: [DATE]
    
    [ ] CONTINUING ACTION
    
    THE PARTICULARS ARE (If additional paper is needed, attach extra sheet(s)):
    
    I was hired by the above-named employer on [HIRE DATE] as a [JOB TITLE]. During my employment, I performed my job satisfactorily.
    
    [DESCRIBE IN DETAIL:
    - The discriminatory actions taken against you
    - Dates of each incident
    - Names and titles of people involved
    - How similarly situated employees of a different protected class were treated better
    - Any statements made that show discriminatory intent
    - Any witnesses to the discrimination]
    
    On [DATE OF ADVERSE ACTION], I was [DESCRIBE ADVERSE ACTION - terminated, demoted, denied promotion, etc.]. The reason given was [STATE REASON EMPLOYER GAVE].
    
    I believe I have been discriminated against because of my [PROTECTED CHARACTERISTIC] in violation of Title VII of the Civil Rights Act of 1964, as amended, [AND/OR OTHER RELEVANT LAWS].
    
    I want this charge filed with both the EEOC and the State or local Agency, if any. I will advise the agencies if I change my address or phone number and I will cooperate fully with them in the processing of my charge in accordance with their procedures.
    
    I declare under penalty of perjury that the foregoing is true and correct.
    
    _____________________    _______________
    Signature                      Date`
  },
  {
    id: "d9",
    title: "Breach of Contract Notice",
    description: "Formal notice informing a party of a contract breach.",
    category: "contracts",
    templateText: `[YOUR NAME/COMPANY NAME]
    [YOUR ADDRESS]
    [CITY, STATE ZIP]
    [YOUR PHONE NUMBER]
    [YOUR EMAIL]
    
    [DATE]
    
    [RECIPIENT NAME/COMPANY NAME]
    [RECIPIENT ADDRESS]
    [CITY, STATE ZIP]
    
    RE: NOTICE OF BREACH OF CONTRACT
    
    Dear [RECIPIENT NAME]:
    
    This letter constitutes formal notice that you are in breach of our contract dated [CONTRACT DATE] (the "Contract") for [BRIEFLY DESCRIBE SUBJECT MATTER OF CONTRACT].
    
    NATURE OF THE BREACH
    
    According to Section [SECTION NUMBER] of the Contract, you are required to [DESCRIBE THE CONTRACTUAL OBLIGATION THAT WAS BREACHED]. However, as of [DATE OF BREACH], you have failed to fulfill this obligation by [DESCRIBE SPECIFICALLY HOW THE OTHER PARTY BREACHED THE CONTRACT]. This constitutes a material breach of the Contract.
    
    EVIDENCE OF THE BREACH
    
    [DESCRIBE ANY EVIDENCE YOU HAVE OF THE BREACH, SUCH AS:
    - Dates of missed deliveries or payments
    - Specific defects in products or services
    - Communications acknowledging failure to perform
    - Documentation of damages resulting from the breach]
    
    DEMAND FOR CURE
    
    Pursuant to Section [SECTION NUMBER] of the Contract [OR PURSUANT TO APPLICABLE LAW], I hereby demand that you cure this breach within [NUMBER] days from receipt of this notice by taking the following action(s):
    
    [CLEARLY LIST THE SPECIFIC ACTIONS REQUIRED TO CURE THE BREACH]
    
    CONSEQUENCES OF FAILURE TO CURE
    
    If you fail to cure this breach within the specified time period, I reserve the right to exercise all available legal and contractual remedies, including:
    
    1. Termination of the Contract;
    2. Filing a lawsuit for damages in the amount of [ESTIMATED DAMAGES];
    3. [ANY OTHER SPECIFIC REMEDIES AVAILABLE UNDER YOUR CONTRACT OR APPLICABLE LAW]
    
    This letter is not intended to be a complete statement of all rights, remedies, and positions regarding this matter. Nothing contained in this letter should be considered a waiver of any rights or remedies available under the Contract or applicable law.
    
    I encourage you to contact me at [YOUR PHONE NUMBER] or [YOUR EMAIL] by [DATE] to discuss how we might resolve this matter amicably.
    
    Sincerely,
    
    [YOUR SIGNATURE]
    
    [YOUR PRINTED NAME]
    [YOUR TITLE, IF APPLICABLE]
    
    cc: [ANYONE ELSE YOU'RE SENDING A COPY TO]
    
    Enclosures: [LIST ANY DOCUMENTS YOU'RE ATTACHING, SUCH AS COPY OF CONTRACT, PROOF OF BREACH, ETC.]`
  }
];

// FAQs
export const faqs: FAQ[] = [
  {
    id: "faq1",
    question: "Do I need a lawyer to file for divorce?",
    answer: "While not legally required in most states, having a lawyer is recommended for complex cases involving children, significant assets, or disputes. For simple, uncontested divorces with minimal assets, self-representation is more feasible. Many courts provide self-help resources for divorce proceedings.",
    category: "family"
  },
  {
    id: "faq2",
    question: "How long does divorce typically take?",
    answer: "The timeline varies greatly depending on your state's laws, whether the divorce is contested, and court backlogs. Uncontested divorces can be completed in as little as 1-3 months in some states, while contested divorces involving complex issues may take a year or longer.",
    category: "family"
  },
  {
    id: "faq3",
    question: "What is the difference between legal separation and divorce?",
    answer: "Legal separation means you remain married but live apart with court-ordered arrangements for finances and children. Divorce legally ends the marriage. Some people choose separation for religious reasons, to maintain health insurance benefits, or as a trial period before deciding on divorce.",
    category: "family"
  },
  {
    id: "faq4",
    question: "Can my landlord enter my apartment without permission?",
    answer: "Most states require landlords to provide advance notice (typically 24-48 hours) before entering a tenant's rental unit, except in genuine emergencies. The specific notice requirements vary by state. Check your lease and local landlord-tenant laws for the rules that apply to your situation.",
    category: "housing"
  },
  {
    id: "faq5",
    question: "How do I get my security deposit back?",
    answer: "When moving out, clean thoroughly, document the condition with photos/video, and request a walk-through with your landlord. Most states require landlords to return deposits within 14-30 days with an itemized list of any deductions. If the landlord improperly withholds your deposit, you may have the right to sue for up to 2-3 times the deposit amount in some states.",
    category: "housing"
  },
  {
    id: "faq6",
    question: "What should I do if I receive an eviction notice?",
    answer: "Don't ignore it! Read it carefully to understand the reason and timeline. Depending on the type of notice, you may have options to cure the problem (like paying overdue rent) or to contest the eviction. Eviction procedures and tenant protections vary by location, so research your local laws or seek legal assistance immediately, as eviction timelines are often very short.",
    category: "housing"
  },
  {
    id: "faq7",
    question: "What constitutes wrongful termination?",
    answer: "Wrongful termination occurs when an employee is fired for illegal reasons, such as discrimination based on protected characteristics (race, gender, religion, etc.), retaliation for protected activities (like whistleblowing or filing a complaint), or in violation of an employment contract. Simple unfairness or personality conflicts generally don't qualify as wrongful termination in at-will employment states.",
    category: "employment"
  },
  {
    id: "faq8",
    question: "How long do I have to file a discrimination complaint?",
    answer: "For federal discrimination claims, you typically must file with the Equal Employment Opportunity Commission (EEOC) within 180 days of the discriminatory act, although this is extended to 300 days in states with their own anti-discrimination laws and agencies. State law claims may have different deadlines, so it's important to act promptly.",
    category: "employment"
  },
  {
    id: "faq9",
    question: "Can I be fired for discussing my salary with coworkers?",
    answer: "No, under the National Labor Relations Act (NLRA), most private-sector employees have the legal right to discuss wages, benefits, and working conditions with colleagues. Employers cannot prohibit such discussions or retaliate against employees for having them, even if they have policies attempting to prevent salary discussions.",
    category: "employment"
  },
  {
    id: "faq10",
    question: "What's the difference between a material and minor breach of contract?",
    answer: "A material breach substantially affects the value of the contract and may allow the injured party to terminate the contract and seek damages. For example, delivering a completely different product than ordered. A minor breach still requires compensation but doesn't typically justify terminating the entire contract, such as a small delay in delivery that causes no significant harm.",
    category: "contracts"
  },
  {
    id: "faq11",
    question: "How long do I have to sue for breach of contract?",
    answer: "The statute of limitations varies by state and type of contract, typically ranging from 3-10 years. Written contracts generally have longer periods than verbal agreements. For example, in California, the limit is 4 years for written contracts and 2 years for oral contracts. In New York, it's 6 years for both. Check your state's specific timeframes.",
    category: "contracts"
  },
  {
    id: "faq12",
    question: "Can I write my own contract without a lawyer?",
    answer: "Yes, you can legally write your own contract, and a simple, clear agreement signed by both parties can be enforceable. However, for complex or high-value agreements, professional legal review is advisable. A well-drafted contract should clearly identify the parties, detail all obligations, specify payment terms, address what happens if things go wrong, and be signed by all parties.",
    category: "contracts"
  }
];

// Helper functions to get data
export function getQuestionById(id: string): Question | undefined {
  return questions.find(q => q.id === id);
}

export function getGuideById(id: string): Guide | undefined {
  return guides.find(g => g.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getDocumentById(id: string): Document | undefined {
  return documents.find(d => d.id === id);
}

export function getFaqsByCategory(categoryId: string): FAQ[] {
  return faqs.filter(faq => faq.category === categoryId);
}

export function getDocumentsByCategory(categoryId: string): Document[] {
  return documents.filter(doc => doc.category === categoryId);
}
