import Principal "mo:base/Principal";
import Time "mo:base/Time";

module {
    public type FacilityRegistration = {
        principal : Principal;
        name : Text;
        location : Location;
        services : [Text];
        capacity : Nat;
        contactInfo : ContactInfo;
    };

    public type Facility = {
        id : Text;
        principal : Principal;
        name : Text;
        location : Location;
        services : [Text];
        capacity : Nat;
        availableBeds : Nat;
        contactInfo : ContactInfo;
        registrationStatus : RegistrationStatus;
    };

    public type Location = {
        latitude : Float;
        longitude : Float;
        address : Text;
    };

    public type ContactInfo = {
        phoneNumber : Text;
        email : Text;
    };

    public type AccidentDetails = {
        location : Location;
        description : Text;
        severity : AccidentSeverity;
        numberOfVictims : Nat;
        reportingFacilityId : Text;
    };

    public type AccidentSeverity = {
        #Minor;
        #Moderate;
        #Severe;
        #Critical;
    };

    public type AccidentStatus = {
        #Reported;
        #ServiceAssigned;
        #InProgress;
        #Resolved;
    };

    public type AccidentReport = {
        id : Text;
        details : AccidentDetails;
        status : AccidentStatus;
        timestamp : Time.Time;
    };

    public type PatientRecord = {
        id : Text;
        accidentId : Text;
        name : Text;
        age : Nat;
        currentFacilityId : Text;
        status : PatientStatus;
        treatmentDetails : Text;
        admissionTimestamp : Time.Time;
        dischargeTimestamp : ?Time.Time;
    };

    public type PatientStatus = {
        #Admitted;
        #UnderTreatment;
        #Stable;
        #Critical;
        #InTransit;
        #Discharged;
    };

    public type Ambulance = {
        id : Text;
        principal : Principal;
        name : Text;
        status : AmbulanceStatus;
        currentLocation : Location;
        assignedAccidentId : ?Text;
        registrationStatus : RegistrationStatus;
    };

    public type AmbulanceStatus = {
        #Available;
        #Assigned;
        #EnRoute;
        #OnSite;
        #Returning;
    };

    public type ReportType = {
        #AccidentReport;
        #TreatmentReport;
        #TransferReport;
    };

    public type Report = {
        id : Text;
        accidentId : Text;
        patientId : Text;
        facilityId : Text;
        reportType : ReportType;
        timestamp : Time.Time;
        details : Text;
    };

    public type RegistrationStatus = {
        #Pending;
        #Approved;
        #Rejected;
    };

    public type UserDetails = {
        id : Text;
        principal : Principal;
        userType : { #Admin; #Facility; #Ambulance };
        name : Text;
        registrationStatus : RegistrationStatus;
    };

    public type AmbulanceRegistration = {
        principal : Principal;
        name : Text;
        location : Location;
        contactInfo : ContactInfo;
    };

    public type SystemOverview = {
        totalFacilities : Nat;
        totalAmbulances : Nat;
        totalPatients : Nat;
        activeAccidents : Nat;
    };
};
