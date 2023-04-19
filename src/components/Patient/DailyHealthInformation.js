import React from "react";

const dailyHealthData = {
  bodyTemperature: "",
  heartRate: "",
  bloodPressureMax: "",
  bloodPressureMin: "",
  respiratoryRate: "",
};

const DailyHealthInformation = () => {
  const handleChange = (event) => {
    dailyHealthData[`${event.target.name}`] = event.target.value;
  };

  const dailyHealthDataFormHandler = async (event) => {
    event.preventDefault();
    console.log(dailyHealthData);
    // add the api call here
  };
  return (
    <div className="container w-50 mt-4 border border-success rounded px-4 shadow-lg p-3 mb-5 bg-body rounded">
      <div className="pt-2">
        <h1 className="lead">Enter your Vital Signs</h1>
      </div>

      <form
        method="POST"
        onChange={handleChange}
        onSubmit={dailyHealthDataFormHandler}
      >
        <div className="d-flex flex-column ">
          <div className="m-3 d-flex flex-column">
            <label forhtml="bodyTemperature">Body Temperature (°F)</label>
            <input
              className="form-control my-2"
              type="number"
              id="bodyTemperature"
              required
              name="bodyTemperature"
              min="1"
            />
          </div>

          <div className="m-3 d-flex flex-column">
            <label forhtml="heartRate">Heart Rate (bpm)</label>
            <input
              className="form-control my-2"
              type="number"
              id="heartRate"
              required
              name="heartRate"
              min="1"
            />
          </div>

          <div className="m-3 d-flex flex-column">
            <label forhtml="bloodPressureMax">Blood Pressure Max (mmHg)</label>
            <input
              className="form-control my-2"
              type="number"
              id="bloodPressureMax"
              required
              name="bloodPressureMax"
              min="1"
            />
          </div>

          <div className="m-3 d-flex flex-column">
            <label forhtml="bloodPressureMin">Blood Pressure Min (mmHg)</label>
            <input
              className="form-control my-2"
              type="number"
              id="bloodPressureMin"
              name="bloodPressureMin"
              required
              min="1"
            />
          </div>
          <div className="m-3 d-flex flex-column">
            <label forhtml="respiratoryRate">
              Respiratory Rate (breaths per minute)
            </label>
            <input
              className="form-control my-2"
              type="number"
              id="respiratoryRate"
              required
              name="respiratoryRate"
              min="1"
            />
          </div>

          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-primary btn-lg m-4 px-4"
              type="submit"
            >
              SUBMIT
            </button>

            <button
              type="reset"
              className="btn btn-outline-danger btn-lg m-4 px-4"
            >
              RESET
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DailyHealthInformation;
