package main

import (
	"encoding/json"
	"fmt"
	. "fmt"
	"strconv"
	"time"
)

const (
	CREATED = "CREATED"
	UPDATED = "UPDATED"
)

type ReportOutput struct {
	Result []Report `json:"reports"`
}
type TreatmentOutput struct {
	Result []Treatment `json:"result"`
}
type TestOutput struct {
	Result []Test `json:"result"`
}

func (c *Chaincode) RefTest(ctx CustomTransactionContextInterface, patientID, reportID, labID, name, refDoctor string, typeoftest int) (string, error) {
	// if ctx.GetData() == nil {
	// 	return "", Errorf("Report with ID %v doesn't exists", reportID)
	// }

	// var report Report
	// json.Unmarshal(ctx.GetData(), &report)
	// if report.Doctor != doc from certs {
	// 	return Errorf("Cannot prescribe drug from the patient")
	// }
	// if ok := c.checkConsent(ctx, report.PatientID, refDoctor); !ok {
	// 	return "", Errorf("No consent from the patient")
	// }

	id := TESTS + getSafeRandomString(ctx.GetStub())
	test := Test{
		DocTyp:            TESTS,
		ReportID:          reportID,
		PatientID:         patientID,
		LabID:             labID,
		ID:                id,
		Name:              name,
		RefDoctor:         refDoctor,
		Status:            0,
		MediaFileLocation: []string{},
		CreateTime:        time.Now().Unix(),
		UpdateTime:        time.Now().Unix(),
	}
	if typeoftest == 1 {
		test.TypeOfT = 1
	}
	testAsByte, _ := json.Marshal((test))
	return test.ID, ctx.GetStub().PutState(id, testAsByte)
}

func (c *Chaincode) RefTreatment(ctx CustomTransactionContextInterface, patientID, reportID, refDoctor, name string) (string, error) {
	// if ctx.GetData() == nil {
	// 	return "", Errorf("Report with ID %v doesn't exists", reportID)
	// }

	// var report Report
	// json.Unmarshal(ctx.GetData(), &report)
	// if report.Doctor != doc from certs {
	// 	return Errorf("Cannot prescribe drug from the patient")
	// }
	// if ok := c.checkConsent(ctx, report.PatientID, refDoctor); !ok {
	// 	return "", Errorf("No consent from the patient")
	// }
	id := TREATMENT + getSafeRandomString(ctx.GetStub())
	treatment := Treatment{
		DocTyp:            TREATMENT,
		ReportID:          reportID,
		ID:                id,
		RefDoctor:         refDoctor,
		Name:              name,
		Comments:          make(map[string]string),
		Status:            0,
		MediaFileLocation: []string{},
		CreateTime:        time.Now().Unix(),
		UpdateTime:        time.Now().Unix(),
		// PatientID:         report.PatientID,
		PatientID: patientID,
	}
	treatmentAsByte, _ := json.Marshal(treatment)
	return treatment.ID, ctx.GetStub().PutState(treatment.ID, treatmentAsByte)
}

func (c *Chaincode) PrescribeDrugs(ctx CustomTransactionContextInterface, patientID, reportID, refDoctor, pharamacyID, Drugs_note_media string) (string, error) {

	id := DRUGS + getSafeRandomString(ctx.GetStub())
	drugs := Drugs{
		DocTyp:           DRUGS,
		ReportID:         reportID,
		PatientID:        patientID,
		PharamacyID:      pharamacyID,
		ID:               id,
		RefDoctor:        refDoctor,
		Drugs_note_media: Drugs_note_media,
		CreateTime:       time.Now().Unix(),
		UpdateTime:       time.Now().Unix(),
	}
	drugsAsByte, _ := json.Marshal(drugs)
	return drugs.ID, ctx.GetStub().PutState(drugs.ID, drugsAsByte)
}

func (c *Chaincode) AddCommentsToReport(ctx CustomTransactionContextInterface, reportID, comment, refDoctor string) error {
	// if ctx.GetData() == nil {
	// 	return Errorf("Report with ID %v doesn't exists", reportID)
	// }

	var report Report
	json.Unmarshal(ctx.GetData(), &report)
	// if report.Doctor != doc from certs {
	// 	return Errorf("Cannot prescribe drug from the patient")
	// }
	if ok := c.checkConsent(ctx, report.PatientID, refDoctor); !ok {
		return Errorf("No consent from the patient")
	}
	timeNow := time.Now().Unix()
	stringTime := strconv.FormatInt(timeNow, 10)
	report.UpdateTime = time.Now().Unix()
	report.Comments[stringTime] = comment
	reportAsByte, _ := json.Marshal(report)

	return ctx.GetStub().PutState(report.ID, reportAsByte)
}

func (c *Chaincode) AddCommentsToTreatment(ctx CustomTransactionContextInterface, treatmentID, superviosr, comment string) error {
	if ctx.GetData() == nil {
		return Errorf("Treatment with ID %v doesn't exists", treatmentID)
	}
	var treatment Treatment
	json.Unmarshal(ctx.GetData(), &treatment)
	if ok := c.checkConsent(ctx, treatment.PatientID, superviosr); !ok {
		return Errorf("no consent from the patient")
	}
	if treatment.Status == 2 {
		return Errorf("Treatment is already completed")
	}
	timeNow := time.Now().Unix()
	stringTime := strconv.FormatInt(timeNow, 10)
	treatment.Comments[stringTime] = comment

	treatment.UpdateTime = time.Now().Unix()
	treatmentAsByte, _ := json.Marshal(treatment)
	return ctx.GetStub().PutState(treatment.ID, treatmentAsByte)
}

func (c *Chaincode) AddMediaToTreatment(ctx CustomTransactionContextInterface, treatmentID, superviosr string, numberOfMfile int) ([]string, error) {
	if ctx.GetData() == nil {
		return []string{}, Errorf("Treatment with ID %v doesn't exists", treatmentID)
	}
	var treatment Treatment
	json.Unmarshal(ctx.GetData(), &treatment)
	if ok := c.checkConsent(ctx, treatment.PatientID, superviosr); !ok {
		return []string{}, Errorf("No consent from the patient")
	}
	for i := 0; i < numberOfMfile; i++ {
		id := TREATMENT + "media" + getSafeRandomString(ctx.GetStub()) + strconv.Itoa(i)
		treatment.MediaFileLocation = append(treatment.MediaFileLocation, id)
	}
	treatment.UpdateTime = time.Now().Unix()
	treatmentAsByte, _ := json.Marshal(treatment)
	return treatment.MediaFileLocation, ctx.GetStub().PutState(treatment.ID, treatmentAsByte)
}

// Create a new doctor
func (c *Chaincode) CreateDoctor(ctx CustomTransactionContextInterface, id string, name string, email string, specialty string, licenseNo string, phoneNumber string, address string) error {
	// Check if the doctor with the given ID already exists
	exists, err := c.doctorExists(ctx, id)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the doctor with ID %s already exists", id)
	}

	// Create a new doctor struct
	doctor := Doctor{
		DocTyp:      DOCTOR,
		ID:          id,
		Name:        name,
		Email:       email,
		Specialty:   specialty,
		LicenseNo:   licenseNo,
		PhoneNumber: phoneNumber,
		Address:     address,
		CreatedAt:   time.Now().Unix(),
		UpdatedAt:   time.Now().Unix(),
	}

	// Convert the doctor struct to JSON format
	doctorJSON, err := json.Marshal(doctor)
	if err != nil {
		return err
	}

	// Save the doctor to the world state
	err = ctx.GetStub().PutState(id, doctorJSON)
	if err != nil {
		return err
	}

	return nil
}

// doctorExists returns true if the doctor with given ID exists in the ledger
func (c *Chaincode) doctorExists(ctx CustomTransactionContextInterface, id string) (bool, error) {
	doctorJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return false, err
	}
	return doctorJSON != nil, nil
}

// getAllDoctors returns all doctors in the ledger
func (s *Chaincode) GetAllDoctors(ctx CustomTransactionContextInterface) ([]*Doctor, error) {
	// Create a new query string to get all DOCTOR documents
	queryString := fmt.Sprintf(`{"selector":{"docTyp":"%s"}}`, DOCTOR)

	// Create a new query iterator using the query string
	queryResults, err := ctx.GetStub().GetQueryResult(queryString)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query: %v", err)
	}
	defer queryResults.Close()

	// Create a slice to hold the results
	var doctors []*Doctor

	// Iterate over the query results and deserialize each document
	for queryResults.HasNext() {
		queryResult, err := queryResults.Next()
		if err != nil {
			return nil, fmt.Errorf("failed to get next query result: %v", err)
		}

		// Deserialize the document into a Doctor struct
		var doctor Doctor
		err = json.Unmarshal(queryResult.Value, &doctor)
		if err != nil {
			return nil, fmt.Errorf("failed to deserialize doctor: %v", err)
		}

		// Add the doctor to the results slice
		doctors = append(doctors, &doctor)
	}

	return doctors, nil

}

func (c *Chaincode) GetDoctorByID(ctx CustomTransactionContextInterface, doctorID string) (*Doctor, error) {
	// Create a new query string to get the DOCTOR document for the given reportID
	queryString := fmt.Sprintf(`{"selector":{"docTyp":"%s", "id": "%s"}}`, DOCTOR, doctorID)

	// Create a new query iterator using the query string
	queryResults, err := ctx.GetStub().GetQueryResult(queryString)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query: %v", err)
	}
	defer queryResults.Close()

	// Iterate over the query results and deserialize the document
	if queryResults.HasNext() {
		queryResult, err := queryResults.Next()
		if err != nil {
			return nil, fmt.Errorf("failed to get next query result: %v", err)
		}

		// Deserialize the document into a Doctor struct
		var doctor Doctor
		err = json.Unmarshal(queryResult.Value, &doctor)
		if err != nil {
			return nil, fmt.Errorf("failed to deserialize doctor: %v", err)
		}

		return &doctor, nil
	}

	return nil, nil // return nil if no matching doctor found
}
