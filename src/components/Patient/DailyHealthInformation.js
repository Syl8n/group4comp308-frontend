import React from "react";

const dailyHealthData = {
  pulseRate: "",
  bloodPressure: "",
  weight: "",
  temperature: "",
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
    <div className="container">
      <div className="my-2 py-4">
        <h1 className="display-5">Daily Health Information</h1>
      </div>

      <form
        className=" container w-50 border border-success rounded px-4 shadow-lg p-3 mb-5 bg-body rounded"
        method="POST"
        onChange={handleChange}
        onSubmit={dailyHealthDataFormHandler}
      >
        <div className="d-flex flex-column ">
          <div className="m-3">
            <input
              className="form-control"
              type="number"
              id="pulseRate"
              required
              name="pulseRate"
              placeholder="Pulse Rate"
              min="1"
            />
          </div>
          <div className="m-3">
            <input
              className="form-control"
              type="number"
              id="bloodPressure"
              required
              name="bloodPressure"
              placeholder="Blood Pressure"
              min="1"
            />
          </div>

          <div className="m-3">
            <input
              className="form-control"
              type="number"
              id="weight"
              required
              name="weight"
              placeholder="Weight"
              min="1"
            />
          </div>
          <div className="m-3">
            <input
              className="form-control"
              type="number"
              id="temperature"
              name="temperature"
              required
              placeholder="Temperature"
              min="1"
            />
          </div>
          <div className="m-3">
            <input
              className="form-control"
              type="text"
              id="respiratoryRate"
              required
              name="respiratoryRate"
              placeholder="Respiratory Rate"
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
