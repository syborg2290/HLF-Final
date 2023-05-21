package main

import (
	"encoding/json"
	"fmt"
	"time"
)

type OutputResult struct {
	MediaFile []string `josn:"media_file"`
	Type      int      `json:"type_of_test"`
}

// func (c *Chaincode) DoTest(ctx CustomTransactionContextInterface, testID, result, supervisor string, numberOfMfile int) (OutputResult, error) {
// 	existing := ctx.GetData()
// 	if existing == nil {
// 		return OutputResult{MediaFile: []string{}}, Errorf("test with ID: %v doesn't exists", testID)
// 	}
// 	var test Test
// 	json.Unmarshal(existing, &test)
// 	if test.Status == 1 {
// 		return OutputResult{MediaFile: []string{}}, Errorf("test is already done")
// 	}
// 	test.UpdateTime = time.Now().Unix()
// 	for i := 0; i < numberOfMfile; i++ {
// 		test.MediaFileLocation = append(test.MediaFileLocation, getSafeRandomString(ctx.GetStub())+strconv.Itoa(i))
// 	}
// 	test.Supervisor = supervisor
// 	test.Status = 1
// 	test.Result = result
// 	testAsByte, _ := json.Marshal(test)

// 	return OutputResult{MediaFile: test.MediaFileLocation, Type: test.TypeOfT}, ctx.GetStub().PutState(test.ID, testAsByte)
// }

// Create a new lab
func (c *Chaincode) CreateLab(ctx CustomTransactionContextInterface, id string, name string, email string, licenseNo string, phoneNumber string, address string) error {
	// Check if the lab with the given ID already exists
	exists, err := c.labExists(ctx, id)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the lab with ID %s already exists", id)
	}

	// Create a new lab struct
	lab := Laboratory{
		DocTyp:      LABORATORY,
		ID:          id,
		Name:        name,
		Email:       email,
		LicenseNo:   licenseNo,
		PhoneNumber: phoneNumber,
		Address:     address,
		CreatedAt:   time.Now().Unix(),
		UpdatedAt:   time.Now().Unix(),
	}

	// Convert the lab struct to JSON format
	labJSON, err := json.Marshal(lab)
	if err != nil {
		return err
	}

	// Save the lab to the world state
	err = ctx.GetStub().PutState(id, labJSON)
	if err != nil {
		return err
	}

	return nil
}

// labExists returns true if the lab with given ID exists in the ledger
func (c *Chaincode) labExists(ctx CustomTransactionContextInterface, id string) (bool, error) {
	labJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return false, err
	}
	return labJSON != nil, nil
}

// getAllLabs returns all labs in the ledger
func (s *Chaincode) GetAllLabs(ctx CustomTransactionContextInterface) ([]*Laboratory, error) {
	// Create a new query string to get all LABORATORY documents
	queryString := fmt.Sprintf(`{"selector":{"docTyp":"%s"}}`, LABORATORY)

	// Create a new query iterator using the query string
	queryResults, err := ctx.GetStub().GetQueryResult(queryString)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query: %v", err)
	}
	defer queryResults.Close()

	// Create a slice to hold the results
	var labs []*Laboratory

	// Iterate over the query results and deserialize each document
	for queryResults.HasNext() {
		queryResult, err := queryResults.Next()
		if err != nil {
			return nil, fmt.Errorf("failed to get next query result: %v", err)
		}

		// Deserialize the document into a Lab struct
		var lab Laboratory
		err = json.Unmarshal(queryResult.Value, &lab)
		if err != nil {
			return nil, fmt.Errorf("failed to deserialize lab: %v", err)
		}

		// Add the lab to the results slice
		labs = append(labs, &lab)
	}

	return labs, nil

}

func (c *Chaincode) GetLabByID(ctx CustomTransactionContextInterface, labID string) (*Laboratory, error) {
	// Create a new query string to get the DOCTOR HOSPITAL for the given hospitalID
	queryString := fmt.Sprintf(`{"selector":{"docTyp":"%s", "id": "%s"}}`, LABORATORY, labID)

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

		// Deserialize the document into a Hospital struct
		var lab Laboratory
		err = json.Unmarshal(queryResult.Value, &lab)
		if err != nil {
			return nil, fmt.Errorf("failed to deserialize lab: %v", err)
		}

		return &lab, nil
	}

	return nil, nil // return nil if no matching lab found
}
