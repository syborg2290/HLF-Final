package main

import (
	"encoding/json"
	"fmt"
	"time"
)

// func (c *Chaincode) GiveDrugs(ctx CustomTransactionContextInterface, drugID string) error {
// 	existing := ctx.GetData()
// 	if existing == nil {
// 		return Errorf("Drugs with ID: %v doesn't exists", drugID)
// 	}
// 	var drugs Drugs
// 	json.Unmarshal(existing, &drugs)
// 	if drugs.Status == 1 {
// 		return Errorf("Drugs allready given")
// 	}
// 	// check whether this pharmacies stores have roles as pharmacies
// 	drugs.Status = 1
// 	drugs.UpdateTime = time.Now().Unix()
// 	drugAsByte, _ := json.Marshal(drugs)

// 	return ctx.GetStub().PutState(drugs.ID, drugAsByte)
// }

// Create a new pharmacy
func (c *Chaincode) CreatePharmacy(ctx CustomTransactionContextInterface, id string, name string, email string, licenseNo string, phoneNumber string, address string) error {
	// Check if the pharmacy with the given ID already exists
	exists, err := c.pharamcyExists(ctx, id)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the pharmacy with ID %s already exists", id)
	}

	// Create a new pharmacy struct
	pharmacy := Pharmacy{
		DocTyp:      PHARMACY,
		ID:          id,
		Name:        name,
		Email:       email,
		LicenseNo:   licenseNo,
		PhoneNumber: phoneNumber,
		Address:     address,
		CreatedAt:   time.Now().Unix(),
		UpdatedAt:   time.Now().Unix(),
	}

	// Convert the pharmacy struct to JSON format
	pharmacyJSON, err := json.Marshal(pharmacy)
	if err != nil {
		return err
	}

	// Save the pharmacy to the world state
	err = ctx.GetStub().PutState(id, pharmacyJSON)
	if err != nil {
		return err
	}

	return nil
}

// pharamcyExists returns true if the pharmacy with given ID exists in the ledger
func (c *Chaincode) pharamcyExists(ctx CustomTransactionContextInterface, id string) (bool, error) {
	pharmacyJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return false, err
	}
	return pharmacyJSON != nil, nil
}

// getAllPharmacies returns all pharmacies in the ledger
func (s *Chaincode) GetAllPharmacies(ctx CustomTransactionContextInterface) ([]*Pharmacy, error) {
	// Create a new query string to get all PHARMACY documents
	queryString := fmt.Sprintf(`{"selector":{"docTyp":"%s"}}`, PHARMACY)

	// Create a new query iterator using the query string
	queryResults, err := ctx.GetStub().GetQueryResult(queryString)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query: %v", err)
	}
	defer queryResults.Close()

	// Create a slice to hold the results
	var pharmacies []*Pharmacy

	// Iterate over the query results and deserialize each document
	for queryResults.HasNext() {
		queryResult, err := queryResults.Next()
		if err != nil {
			return nil, fmt.Errorf("failed to get next query result: %v", err)
		}

		// Deserialize the document into a Lab struct
		var pharmacy Pharmacy
		err = json.Unmarshal(queryResult.Value, &pharmacy)
		if err != nil {
			return nil, fmt.Errorf("failed to deserialize pharmacy: %v", err)
		}

		// Add the pharmacy to the results slice
		pharmacies = append(pharmacies, &pharmacy)
	}

	return pharmacies, nil
}

func (c *Chaincode) GetPharmacyByID(ctx CustomTransactionContextInterface, pharmacyID string) (*Pharmacy, error) {
	// Create a new query string to get the DOCTOR HOSPITAL for the given hospitalID
	queryString := fmt.Sprintf(`{"selector":{"docTyp":"%s", "id": "%s"}}`, PHARMACY, pharmacyID)

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
		var pharmacy Pharmacy
		err = json.Unmarshal(queryResult.Value, &pharmacy)
		if err != nil {
			return nil, fmt.Errorf("failed to deserialize pharmacy: %v", err)
		}

		return &pharmacy, nil
	}

	return nil, nil // return nil if no matching pharmacy found
}
