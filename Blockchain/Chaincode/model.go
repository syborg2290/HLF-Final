package main

// DocTyp of blockchain data
// used for doing rich query
const (
	REPORT     = "REPORT"
	DRUGS      = "DRUGS"
	TESTS      = "TESTS"
	TREATMENT  = "TREATMENT"
	CONSENT    = "CONSENT"
	DOCTOR     = "DOCTOR"
	HOSPITAL   = "HOSPITAL"
	PHARMACY   = "PHARMACY"
	LABORATORY = "LABORATORY"
)

type Doctor struct {
	DocTyp      string `json:"docTyp"`
	ID          string `json:"id"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	Specialty   string `json:"specialty"`
	LicenseNo   string `json:"license_no"`
	PhoneNumber string `json:"phone_number"`
	Address     string `json:"address"`
	CreatedAt   int64  `json:"created_at"`
	UpdatedAt   int64  `json:"updated_at"`
}

type Hospital struct {
	DocTyp      string `json:"docTyp"`
	ID          string `json:"id"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	LicenseNo   string `json:"license_no"`
	PhoneNumber string `json:"phone_number"`
	Address     string `json:"address"`
	CreatedAt   int64  `json:"created_at"`
	UpdatedAt   int64  `json:"updated_at"`
}

type Pharmacy struct {
	DocTyp      string `json:"docTyp"`
	ID          string `json:"id"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	LicenseNo   string `json:"license_no"`
	PhoneNumber string `json:"phone_number"`
	Address     string `json:"address"`
	CreatedAt   int64  `json:"created_at"`
	UpdatedAt   int64  `json:"updated_at"`
}

type Laboratory struct {
	DocTyp      string `json:"docTyp"`
	ID          string `json:"id"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	LicenseNo   string `json:"license_no"`
	PhoneNumber string `json:"phone_number"`
	Address     string `json:"address"`
	CreatedAt   int64  `json:"created_at"`
	UpdatedAt   int64  `json:"updated_at"`
}

// Report of patient
type Report struct {
	DocTyp     string `json:"docTyp"`
	ID         string `json:"report_id"`
	PatientID  string `json:"patient_id"`
	HospitalID string `json:"hospital_id"`
	// DrugsID []string `json:"drugs_id"`      			///
	// TreatmentID []string `json:"treatment_id"`		/// these will be stored
	// TestID []string `json:"test_id"`
	Title       string            `json:"title"` ///
	Status      string            `json:"status"`
	RefDoctorID string            `json:"doctor_id"`
	Comments    map[string]string `json:"comments"`
	CreateTime  int64             `json:"create_time"`
	UpdateTime  int64             `json:"updated_time"`
}

// Drugs model
type Drugs struct {
	DocTyp           string `json:"docTyp"`
	ReportID         string `json:"report_id"`
	PatientID        string `json:"patient_id"`
	PharamacyID      string `json:"pharmacy_id"`
	ID               string `json:"drugs_id"`
	RefDoctor        string `json:"ref_doctor"`
	Drugs_note_media string `josn:"drug"`
	CreateTime       int64  `json:"create_time"`
	UpdateTime       int64  `josn:"updated_time"`
}

// Test model file
type Test struct {
	DocTyp            string            `json:"docTyp"`
	ReportID          string            `json:"report_id"`
	ID                string            `json:"test_id"`
	PatientID         string            `json:"patient_id"`
	LabID             string            `json:"lab_id"`
	MediaFileLocation []string          `json:"media_file_location"`
	medias            map[string]string `json:"medias"`
	Name              string            `json:"test_name"`
	Supervisor        string            `json:"supervisor_details"` // this will name of supervisor, aadress , path Lab
	RefDoctor         string            `json:"ref_doctor"`
	Result            string            `json:"test_result"`
	Status            int               `json:"status"`       // status of test 0 - not done 1 - done
	TypeOfT           int               `json:"type_of_test"` // 0- normal 1-abnormal
	CreateTime        int64             `json:"create_time"`
	UpdateTime        int64             `josn:"updated_time"`
}

// Treatment model
type Treatment struct {
	DocTyp            string            `json:"docTyp"`
	PatientID         string            `json:"patient_id"`
	ReportID          string            `json:"report_id"`
	ID                string            `json:"treatment_id"`
	Supervisor        string            `json:"supervisor_details"` // deatils of nurses , doctor
	RefDoctor         string            `json:"ref_doctor"`
	Name              string            `josn:"treatment_name"`
	MediaFileLocation []string          `josn:"media_file_location"`
	medias            map[string]string `json:"medias"`
	Comments          map[string]string `json:"comments"`
	Status            int               // 0 not done 1 started 2  done 3 failed
	CreateTime        int64             `json:"create_time"`
	UpdateTime        int64             `josn:"updated_time"`
}

// Consent model file
type Consent struct {
	DocTyp              string           `json:"docTyp"`
	ID                  string           `json:"patient__id"`
	FirstName           string           `json:"patient__fname"`
	LastName            string           `json:"patient__lname"`
	BloodType           string           `json:"patient__bloodtype"`
	DOB                 string           `json:"patient__dob"`
	PermanentConsenters map[string]bool  `json:"parma_consenters"` // list of permanent consenter
	TemporaryConsenters map[string]int64 `josn:"temp_consenters"`  // id of consenters mapped to expiry time unix
	// 	Status              string           `json:"status"`           // defined status crises status
	// 	Track               []string         `json:"track"`            // track to who he/she meet (id)
}
