import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Map "mo:map/Map";
import { thash } "mo:map/Map";

import Types "Types";

actor AccidentCanister {
    type AccidentReport = Types.AccidentReport;
    type Result<T, E> = Result.Result<T, E>;

    private stable var nextAccidentId : Nat = 0;
    private var accidents = Map.new<Text, AccidentReport>();

    public shared ({ caller }) func createAccidentReport(details : Types.AccidentDetails) : async Result<Text, Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous principals are not allowed to create accident reports");
        };

        let accidentId = Nat.toText(nextAccidentId);
        nextAccidentId += 1;

        let newReport : AccidentReport = {
            id = accidentId;
            details = details;
            status = #Reported;
            timestamp = Time.now();
        };

        Map.set(accidents, thash, accidentId, newReport);

        // Generate accident report
        let reportCanister = actor ("by6od-j4aaa-aaaa-qaadq-cai") : actor {
            generateReport : (Types.Report) -> async Result<Text, Text>;
        };
        let report : Types.Report = {
            id = ""; // Will be assigned by ReportCanister
            accidentId = accidentId;
            patientId = ""; // No patient associated yet
            facilityId = details.reportingFacilityId;
            reportType = #AccidentReport;
            timestamp = Time.now();
            details = "New accident reported";
        };

        switch (await reportCanister.generateReport(report)) {
            case (#ok(reportId)) {
                #ok("Accident report created successfully with ID: " # accidentId # ". Report ID: " # reportId);
            };
            case (#err(error)) {
                // Log the error, but don't fail the accident report creation
                #ok("Accident report created successfully with ID: " # accidentId # ", but report generation failed: " # error);
            };
        };
    };

    public shared ({ caller }) func updateAccidentStatus(accidentId : Text, status : Types.AccidentStatus) : async Result<Text, Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous principals are not allowed to update accident status");
        };

        switch (Map.get(accidents, thash, accidentId)) {
            case null { #err("Accident not found") };
            case (?accident) {
                let updatedAccident : AccidentReport = {
                    accident with
                    status = status;
                };
                Map.set(accidents, thash, accidentId, updatedAccident);

                // Generate status update report
                let reportCanister = actor ("by6od-j4aaa-aaaa-qaadq-cai") : actor {
                    generateReport : (Types.Report) -> async Result<Text, Text>;
                };
                let report : Types.Report = {
                    id = ""; // Will be assigned by ReportCanister
                    accidentId = accidentId;
                    patientId = ""; // No specific patient
                    facilityId = accident.details.reportingFacilityId;
                    reportType = #AccidentReport;
                    timestamp = Time.now();
                    details = "Accident status updated to " # debug_show (status);
                };

                switch (await reportCanister.generateReport(report)) {
                    case (#ok(reportId)) {
                        #ok("Accident status updated successfully. Report ID: " # reportId);
                    };
                    case (#err(error)) {
                        // Log the error, but don't fail the status update
                        #ok("Accident status updated successfully, but report generation failed: " # error);
                    };
                };
            };
        };
    };

    public shared ({ caller }) func assignPatientToAccident(accidentId : Text, patientId : Text) : async Result<Text, Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous principals are not allowed to assign patients to accidents");
        };

        switch (Map.get(accidents, thash, accidentId)) {
            case null { #err("Accident not found") };
            case (?accident) {
                // Update patient record
                let patientCanister = actor ("b77ix-eeaaa-aaaa-qaada-cai") : actor {
                    updatePatientStatus : (Text, Types.PatientStatus) -> async Result<Text, Text>;
                };

                let patientUpdateResult = await patientCanister.updatePatientStatus(patientId, #UnderTreatment);

                switch (patientUpdateResult) {
                    case (#err(error)) {
                        return #err("Error updating patient status: " # error);
                    };
                    case (#ok(_)) {
                        // Continue with report generation
                    };
                };

                // Generate patient assignment report
                let reportCanister = actor ("by6od-j4aaa-aaaa-qaadq-cai") : actor {
                    generateReport : (Types.Report) -> async Result<Text, Text>;
                };
                let report : Types.Report = {
                    id = ""; // Will be assigned by ReportCanister
                    accidentId = accidentId;
                    patientId = patientId;
                    facilityId = accident.details.reportingFacilityId;
                    reportType = #AccidentReport;
                    timestamp = Time.now();
                    details = "Patient assigned to accident";
                };

                switch (await reportCanister.generateReport(report)) {
                    case (#ok(reportId)) {
                        #ok("Patient assigned to accident successfully. Report ID: " # reportId);
                    };
                    case (#err(error)) {
                        // Log the error, but don't fail the patient assignment
                        #ok("Patient assigned to accident successfully, but report generation failed: " # error);
                    };
                };
            };
        };
    };

    public query func getAccidentReport(accidentId : Text) : async Result<AccidentReport, Text> {
        switch (Map.get(accidents, thash, accidentId)) {
            case null { #err("Accident not found") };
            case (?accident) { #ok(accident) };
        };
    };

    public shared ({ caller }) func closeAccidentCase(accidentId : Text) : async Result<Text, Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous principals are not allowed to close accident cases");
        };

        switch (Map.get(accidents, thash, accidentId)) {
            case null { #err("Accident not found") };
            case (?accident) {
                let closedAccident : AccidentReport = {
                    accident with
                    status = #Resolved;
                };
                Map.set(accidents, thash, accidentId, closedAccident);

                // Generate closure report
                let reportCanister = actor ("by6od-j4aaa-aaaa-qaadq-cai") : actor {
                    generateReport : (Types.Report) -> async Result<Text, Text>;
                };
                let report : Types.Report = {
                    id = ""; // Will be assigned by ReportCanister
                    accidentId = accidentId;
                    patientId = ""; // No specific patient
                    facilityId = accident.details.reportingFacilityId;
                    reportType = #AccidentReport;
                    timestamp = Time.now();
                    details = "Accident case closed";
                };

                switch (await reportCanister.generateReport(report)) {
                    case (#ok(reportId)) {
                        #ok("Accident case closed successfully. Report ID: " # reportId);
                    };
                    case (#err(error)) {
                        #ok("Accident case closed successfully, but report generation failed: " # error);
                    };
                };
            };
        };
    };

    public shared ({ caller }) func reassignAmbulance(accidentId : Text, newAmbulanceId : Text) : async Result<Text, Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous principals are not allowed to reassign ambulances");
        };

        switch (Map.get(accidents, thash, accidentId)) {
            case null { #err("Accident not found") };
            case (?accident) {
                // Call AmbulanceCanister to reassign the ambulance
                let ambulanceCanister = actor ("be2us-64aaa-aaaa-qaabq-cai") : actor {
                    assignAmbulance : (Text, Text) -> async Result<Text, Text>;
                };

                switch (await ambulanceCanister.assignAmbulance(newAmbulanceId, accidentId)) {
                    case (#ok(message)) {
                        // Generate reassignment report
                        let reportCanister = actor ("by6od-j4aaa-aaaa-qaadq-cai") : actor {
                            generateReport : (Types.Report) -> async Result<Text, Text>;
                        };
                        let report : Types.Report = {
                            id = ""; // Will be assigned by ReportCanister
                            accidentId = accidentId;
                            patientId = ""; // No specific patient
                            facilityId = accident.details.reportingFacilityId;
                            reportType = #AccidentReport;
                            timestamp = Time.now();
                            details = "Ambulance reassigned. New Ambulance ID: " # newAmbulanceId;
                        };

                        switch (await reportCanister.generateReport(report)) {
                            case (#ok(reportId)) {
                                #ok("Ambulance reassigned successfully. " # message # " Report ID: " # reportId);
                            };
                            case (#err(error)) {
                                #ok("Ambulance reassigned successfully, but report generation failed: " # error);
                            };
                        };
                    };
                    case (#err(error)) {
                        #err("Error reassigning ambulance: " # error);
                    };
                };
            };
        };
    };

    public query func listActiveAccidents() : async [AccidentReport] {
        Iter.toArray(Map.vals(accidents));
    };
    public query func getAccidentDetails(accidentId : Text) : async Result<AccidentReport, Text> {
        switch (Map.get(accidents, thash, accidentId)) {
            case null { #err("Accident not found") };
            case (?accident) { #ok(accident) };
        };
    };

    public query func getActiveAccidentsCount() : async Nat {
        Map.size(accidents);
    };
};
