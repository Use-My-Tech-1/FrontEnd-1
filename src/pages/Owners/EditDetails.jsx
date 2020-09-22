import React from "react";

function EditDetails(props) {
  const data = props.location.state;
  const initalState = {
    itemName: data.itemName,
    price: data.price,
    rentalTerm: data.rentalTerm,
    description: data.description,
  };

  const [formValue, setFormValue] = React.useState(initalState);
  console.log("data", data);

  const handleFormChanges = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formValue);
  };

  console.log(formValue);
  return (
    <div className="centerWrapper">
      <h1 className="edit-heading-title">Edit Item Page</h1>

      <div className="edit-main">
        <div className="edit-edit">
          <form className="editItems-form" onSubmit={handleFormSubmit}>
            <label htmlFor="itemName">Item Name</label>
            <input
              id="itemName"
              type="text"
              name="itemName"
              value={formValue.itemName}
              onChange={handleFormChanges}
            />

            <label htmlFor="price">Item Price</label>
            <input
              id="price"
              type="text"
              name="price"
              value={formValue.price}
              onChange={handleFormChanges}
            />
            <label htmlFor="rentalTerm">Item Rental Term</label>
            <input
              id="rentalTerm"
              type="text"
              name="rentalTerm"
              value={formValue.rentalTerm}
              onChange={handleFormChanges}
            />
            <label htmlFor="rentalTerm">Item Description</label>
            <textarea
              id="description"
              type="textarea"
              name="description"
              rows="6"
              value={formValue.description}
              onChange={handleFormChanges}
            />
            <button className="save-sidebar-btn">Save Chages</button>
          </form>
        </div>
        <div className="edit-sidebar">
          <span>Item ID{data.id}</span>
          <img
            className="edit-imageavatar"
            src={data.imageUrl}
            alt={data.itemName}
          />
          <input type="file" />
        </div>
      </div>
    </div>
  );
}

export default EditDetails;
