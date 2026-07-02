export const aiTips = {
    businessDetails: {
      legalName: "This is the official name of your business as registered with the government (e.g., on your PAN card). It cannot be changed here.",
      tradeName: "This is the name your business uses to interact with customers. If it's the same as your legal name, you can leave this blank.",
      additionalTradeName: "If your business operates under multiple names, you can add them here. This is optional.",
      state: "The state where your business is located. This is pre-filled based on your initial registration.",
      district: "Select the district where your business is registered.",
      casualTaxablePerson: "Answer 'Yes' if you are a temporary or occasional seller in a state where you don't have a permanent place of business.",
      compositionScheme: "The composition scheme is a simpler tax option for small businesses. Choose 'Yes' if you want to opt for it, but check the eligibility criteria first.",
      constitution: "Select the legal structure of your business (e.g., proprietorship, partnership, private limited company).",
      reason: "Select the primary reason for obtaining GST registration from the dropdown menu.",
      commencementDate: "Select the date your business was officially started. If you are just starting, you can select today's date."
    },
    promoterDetails: {
      primaryAuthorizedSignatory: "Check this box if this person is the main signatory responsible for all GST compliance. You can have multiple signatories, but only one can be the primary.",
      firstName: "Enter the full name of the authorized signatory as it appears on their official documents.",
      middleName: "Enter the full name of the authorized signatory as it appears on their official documents.",
      lastName: "Enter the full name of the authorized signatory as it appears on their official documents.",
      fatherFirstName: "Provide the full name of the signatory's father.",
      fatherMiddleName: "Provide the full name of the signatory's father.",
      fatherLastName: "Provide the full name of the signatory's father.",
      dob: "Select the signatory's date of birth. It must match their PAN card.",
      mobileNumber: "Enter a valid 10-digit mobile number for the signatory. This number will be used for sending OTPs for verification.",
      emailAddress: "Provide an active email address. All official communication from the GST portal will be sent here.",
      gender: "Select the appropriate gender for the signatory.",
      telephoneStd: "This is an optional field for providing a landline number.",
      telephoneNumber: "This is an optional field for providing a landline number.",
      designation: "Enter the designation of the authorized signatory (e.g., CEO, Director, Owner).",
      pan: "Enter the 10-digit Permanent Account Number (PAN) of the signatory.",
      isCitizen: "Select if the signatory is a citizen of India.",
      address: "Enter the full residential address of the signatory.",
      existingRegistrationType: "If the signatory is already registered under any other tax laws (like VAT, Service Tax), provide those details here. This is generally not required for new businesses.",
      existingRegistrationNumber: "Enter the registration number for the existing registration type.",
      existingRegistrationDate: "Select the date of the existing registration.",
      tradeNameDocument: "This section is for uploading a supporting document, like a Letter of Authorization or a copy of the board resolution, that proves this person is authorized to act on behalf of the business.",
      photo: "Upload a recent, clear, passport-sized photograph of the authorized signatory. The photo must be in JPEG format and the file size should be under 100 KB.",
      alsoAuthorizedSignatory: "Check this box if this person should also be an authorized signatory."
    },
    authorizedSignatory: {
        primaryAuthorizedSignatory: "✅ Check this box if this person is the main signatory responsible for all GST compliance. Only one person can be the primary signatory.",
        firstName: "Enter the signatory\'s given name exactly as it appears on their PAN card. Do not use initials or nicknames.",
        middleName: "If the signatory has a middle name on their official documents, enter it here. If they do not have one, **leave this field blank**.",
        lastName: "Enter the signatory\'s surname or family name. This must also match their PAN card precisely.",
        fatherName: "Provide the full name of the signatory\'s father as it appears on official documents.",
        dob: "📅 Select the signatory\'s date of birth from the calendar. It must match their PAN card.",
        mobileNumber: "📱 Enter a valid 10-digit mobile number. This number is crucial as it will be used for sending OTPs for verification.",
        emailAddress: "📧 Provide an active email address. All official communication from the GST portal will be sent here.",
        gender: "Select the appropriate gender for the signatory.",
        telephoneNumber: "☎️ This is an optional field for providing a landline number. You can leave it blank if you don't have one."
      },
      authorizedRepresentative: {
        hasAuthorizedRepresentative: "This is an optional step. Most new businesses do not need an authorized representative and can leave this turned off.",
        representativeType: "If you do have a representative, select whether they are a GST Practitioner or another type of professional like a Chartered Accountant.",
        enrolmentId: "Enter the GST Practitioner\'s ID or the name of the person you are authorizing to act on your behalf for GST-related matters."
      },
      principalPlace: {
        pinCode: "📍 Enter the 6-digit PIN code of your primary business location. This is important for determining your tax jurisdiction.",
        state: "🗺️ This field will be automatically filled in once you enter a valid PIN code.",
        district: "🏙️ This will also be auto-populated based on the PIN code. Verify that it is correct.",
        locality: "🛣️ Enter the specific area, colony, or locality where your business is situated.",
        road: "🛤️ Enter the name of the road or street.",
        city: "🏘️ Enter the name of your city, town, or village.",
        premisesName: "🏢 Provide the name of the building or complex, if applicable. For example, \"Orbit Tower\".",
        buildingNo: "🏢 Enter the Building No. / Flat No. / Door No. of your business.",
        floorNo: "🔢 Enter the Floor No. of your business.",
        landmark: "📍 Enter a nearby landmark to help locate your business.",
        latitude: "📍 Enter the latitude of your business location.",
        longitude: "📍 Enter the longitude of your business location.",
        wardCircle: "🔢 Enter the ward number, circle, or sector for your locality. This can usually be found on your electricity bill.",
        commissionerate: "🏛️ This is a tax jurisdiction field that will be auto-populated based on your address.",
        division: "🏛️ This is a sub-category of the Commissionerate and will also be auto-populated.",
        range: "🏛️ This is a further sub-division of the tax jurisdiction that will be filled automatically.",
        officialEmail: "📧 Provide the primary email address for your business. All official GST communication will be sent here.",
        officialTelephone: "☎️ Enter a landline number for your business, including the STD code. This is an optional field.",
        mobileNumber: "📱 Provide the primary mobile number for your business. This will be used for OTP verification and alerts.",
        faxNumber: "📠 Enter the FAX number of your business, including the STD code. This is an optional field.",
        possessionNature: "📄 AI Document Scan: Upload your rent or ownership agreement. The AI will read it and automatically select the correct option (e.g., Owned, Rented) for you.",
        proofOfPlace: "📎 Select the type of document you are uploading as proof of your principal place of business.",
        proofOfPlaceFile: "📎 Click to upload a clear, scanned copy of your address proof (e.g., rental agreement, electricity bill). File size must be under 1 MB.",
        businessActivity: "📊 Check all boxes that apply to the activities at this location (e.g., **Retail Business**, **Service Provider**).",
        hasAdditionalPlace: "🏢 Toggle this on **only if** you operate from more than one location, like a branch office or warehouse."
      },
      additionalPlace: {
        additionalPlaces: "🏢 Use this section to declare any locations you operate from besides your main address, such as branch offices, warehouses, or manufacturing units.",
        noAdditionalPlaces: "🤷‍♂️ If your business operates from only one location, you don't need to add anything here. You can simply click 'Next'.",
        addPlace: "➕ Click this button to open a form where you can enter the address and other details for a secondary business location.",
        note: "📝 You can skip this step for now if you don't have additional business places. These can be added later through the GST portal if needed."
      },
      goodsAndServices: {
        goodsServicesTabs: "🛒 Select the 'Goods' tab if you sell products, or the 'Services' tab if you provide services. You can add entries to both.",
        specifyTop5: "📝 You only need to list the main 5 goods or services your business deals with. This helps classify your business for tax purposes.",
        search: "🔍 Start typing the name of a good/service or its HSN/SAC code. The system will suggest matching options for you to select.",
        hsnSacInfo: "Goods have HSN (Harmonized System of Nomenclature) codes. Services have SAC (Services Accounting Code) codes. Ensure you are in the correct tab."
      },
      stateSpecificInformation: {
        possessionNature: "📄 Select how you occupy the premises (e.g., Owned, Rented). This should match what you selected in the 'Principal Place of Business' step.",
        electricityBoard: "📍 Geo-Suggestion: Based on your address in Rajkot, we've pre-filled this with 'Paschim Gujarat Vij Company Ltd. (PGVCL)'. This ensures accuracy.",
        consumerNumber: "💡 Bill Scan & Fill: Simply upload a photo of your electricity bill. The AI will find your 11-digit Consumer Number and fill it in, preventing any typos.",
        professionalTaxEC: "🤖 Smart Check: Don't have employees? The AI knows this and will mark the field as 'Not Applicable'. If you do, it can find the number from your uploaded tax document.",
        professionalTaxRC: "📄 AI Extract: Upload your Gujarat PTRC document. The AI will scan it and instantly pull the correct certificate number into this field.",
        exciseLicense: "⚖️ State-Aware Logic: The AI understands this is likely not applicable for your business in Gujarat and has disabled this field to simplify the form.",
        exciseLicenseHolder: "👤 This field is disabled as a State Excise License is likely not applicable in Gujarat."
      },
      aadhaarAuth: {
        optForAadhaar: "🔒 Aadhaar authentication is the fastest way to verify your identity. Opting for 'Yes' will send a verification link to the selected promoter's mobile/email, leading to quicker ARN generation.",
        partnerSelection: "👥 Select the promoter/partner who will complete the Aadhaar e-KYC verification. You must select at least one person to proceed."
    },
    verification: {
        affirmation: "✅ By checking this box, you are making a legal declaration that all the information you have provided is true and correct to the best of your knowledge.",
        authSignatory: "✍️ Select the person who is legally authorized to sign on behalf of the business. This is usually a director, partner, or proprietor.",
        place: "📍 Enter the city or town where you are signing this declaration. This is typically the location of your principal place of business.",
        submit: "🔒 Choose your preferred method for secure submission. **DSC** uses a physical token, while **EVC** sends a one-time password to your registered mobile and email."
    }
  };