const express = require("express");
const router = express.Router();
const healthcareProfessionalSchema = require("../schemas/healthcareProfessional");
const ParentSchema = require("../schemas/guardianSchema");
const babySchema = require("../schemas/babySchema");
const vaccinationSchema = require("../schemas/vaccinationSchema")


//Healthcare Professional Account Creation
router.post("/create-health-acc", async (req, res) => {
    try {
        const { firstName, lastName, nic, postalCode, email, username, password } = req.body;

        const newHealthAcc = new healthcareProfessionalSchema({
            hcpName: {
              firstName: firstName,
              lastName: lastName,
            },
            hcpNIC: nic,
            hcpPostalCode: postalCode,
            hcpEmail: email,
            hcpUsername: username, // For Login
            hcpPassword: password
        });

        // Save the new account to the database using async/await
        const savedHealthAccount = await newHealthAcc.save();

        return res.status(201).send(savedHealthAccount); // Sending the saved account's data with HTTP 201
    } catch (err) {
        return res.status(500).send("Account creation failed: " + err.message); // Handle database errors
    }
});

//Edit Healthcare Professional Account
router.put("/update-health-acc/:nic", async (req, res) => {
  try {
    const nic = req.params.nic;
    //In request body use Schema Attributes
    const updateData = req.body;
    console.log(updateData);
    const account = await healthcareProfessionalSchema.findOneAndUpdate(
      { hcpNIC: nic },
      { $set: updateData },
      { new: true }
    );

    if (!account) {
      return res.status(404).send("Account not found");
    }

    return res.status(200).send(account);
  } catch (err) {
    return res
      .status(500)
      .send("Error while updating account information: " + err.message);
  }
});


//Healthcare Professional Account Deletion
router.delete("/delete-helath-acc/:nic", async (req, res) => {
    const nic = req.params.nic;
  
    try {
      const result = await healthcareProfessionalSchema.findOneAndDelete({ hcpNIC: nic });
  
      if (!result) {
        return res.status(404).json({ error: "Health Professional Account not found" });
      }
  
      return res.status(200).json({ message: "Health Professional Account removed" });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Error while deleting account", message: err.message });
    }
  });



  //Mother or Guardian Account Creation
router.post("/create-parent-acc", async (req, res) => {
  try {
      const { mfirstName, mlastName, mnic, address ,postalcode, email,telephone, username, password } = req.body;

      const newParentAcc = new ParentSchema({
        motherorGuardianName: {
          firstName: mfirstName,
          lastName: mlastName,
          },
          motherorGuardianNIC: mnic,
          Address: address,
          PostalCode: postalcode,
          guardianEmail: email,
          guardianTelephoneNumber: telephone,
          parentAccountUsername: username,
          parentAccountPassword:password

      });
      

      // Save the new account to the database using async/await
      const savedParentAccount = await newParentAcc.save();

      return res.status(201).send(savedParentAccount); // Sending the saved account's data with HTTP 201
  } catch (err) {
      return res.status(500).send("Account creation failed: " + err.message); // Handle database errors
  }
});

//Edit Parent Account
router.put("/update-parent-acc/:nic", async (req, res) => {
  try {
    const nic = req.params.nic;
    //In request body use Schema Attributes
    const updateData = req.body;
    console.log(updateData);
    const account = await ParentSchema.findOneAndUpdate(
      { motherorGuardianNIC: nic },
      { $set: updateData },
      { new: true }
    );

    if (!account) {
      return res.status(404).send("Account not found");
    }

    return res.status(200).send(account);
  } catch (err) {
    return res
      .status(500)
      .send("Error while updating account information: " + err.message);
  }
});

//Parent Account Deletion
router.delete("/delete-parent-acc/:nic", async (req, res) => {
  const nic = req.params.nic;

  try {
    const result = await ParentSchema.findOneAndDelete({ motherorGuardianNIC: nic });

    if (!result) {
      return res.status(404).json({ error: "Parent Account not found" });
    }

    return res.status(200).json({ message: "Parent Account removed" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error while deleting account", message: err.message });
  }
});

//Baby Account Creation
router.post("/create-baby-acc", async (req, res) => {
  try {
    const {mfirstName, mlastName, mnic, gender, ofc, birthTime , birthDate ,birthweight , birthHospital, fatherName, fatherNic} = req.body;
    const babyId = Math.floor(Math.random() * 100000000);

    const newBabyAcc = new babySchema({
      babyName: {
        firstName: mfirstName,
        lastName: mlastName,
      },
      motherorGuardianNIC: mnic,
      fatherName:fatherName,
      fatherNic: fatherNic,
      bid: babyId,
      gender: gender,
      ofc: ofc,
      birthTime:birthTime,
      birthDate: birthDate,
      weight: birthweight,
      hospitalName: birthHospital
    });

    // Save the new account to the database using async/await
    const savedBabyAccount = await newBabyAcc.save();

    return res.status(201).send(savedBabyAccount); // Send HTTP 201 for resource creation along with the saved account's data
  } catch (err) {
    return res.status(500).send("Account creation failed: " + err.message); // Handle database errors
  }
});

//Edit Baby Account
router.put("/update-baby-acc/:babyId", async (req, res) => {
  try {
    const babyId = req.params.babyId;
    //In request body use Schema Attributes
    const updateData = req.body;
    console.log(updateData);
    const account = await babySchema.findOneAndUpdate(
      { bid: babyId },
      updateData,
      { new: true }
    );

    if (!account) {
      return res.status(404).send("Account not found");
    }

    return res.status(200).send(account);
  } catch (err) {
    return res
      .status(500)
      .send("Error while updating account information: " + err.message);
  }
});

//Baby Account Deletion
router.delete("/delete-baby-acc/:babyId", async (req, res) => {
  const babyId = req.params.babyId;

  try {
    const result = await babySchema.findOneAndDelete({ bid: babyId });

    if (!result) {
      return res.status(404).json({ error: "Baby Account not found" });
    }

    return res.status(200).json({ message: "Baby Account removed" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error while deleting account", message: err.message });
  }
});

// Get Baby Acount Details
router.get("/baby-acc-info/:babyId",async(req,res) => {
  try{
      const {babyId} = req.params;
      const account = await babySchema.findOne({bid:babyId});

      if(!account){
        return res.status(400).send("Account not found");
      }
      return res.status(200).send(account);

  }catch(err){
    return res
    .status(500)
    .send("Error while fetching Account Information: "+ err.message);
  }
})

// Baby Vaccination Adding
router.post("/vacc-adding", async (req, res) => {
  try {
    const { babyId, vaccine, vaccinator, bcode, location } = req.body;

    const newVaccine = new vaccinationSchema({
      bid: babyId,
      vacname: vaccine,
      vaccinator,
      bottle_code: bcode, // Updated to use shorthand property name
      "dateTime.date": new Date().toLocaleDateString(),
      "dateTime.time": new Date().toLocaleTimeString(),
      location,
    });

    // Save the new vaccine to the database using async/await
    const savedVaccination = await newVaccine.save();

    return res.status(201).send(savedVaccination); // Send HTTP 201 for resource creation along with the saved vaccination data
  } catch (err) {
    return res.status(500).send("Vaccination Adding failed: " + err.message); // Handle database errors
  }
});


//Update Vaccination Details
router.put("/update-vacc/:bcode", async (req, res) => {
  try {
    const bcode = req.params.bcode;
    //In request body use Schema Attributes
    const updateData = req.body;
    console.log(updateData);
    const details = await vaccinationSchema.findOneAndUpdate(
      { bottle_code: bcode },
      updateData,
      { new: true }
    );

    if (!details) {
      return res.status(404).send("Vacc Details not found");
    }

    return res.status(200).send(details);
  } catch (err) {
    return res
      .status(500)
      .send("Error while updating vaccination details: " + err.message);
  }
});

//Vaccination Details Deletion
router.delete("/delete-vacc/:bcode", async (req, res) => {
  const bcode = req.params.bcode;

  try {
    const result = await vaccinationSchema.findOneAndDelete({ bottle_code: bcode });

    if (!result) {
      return res.status(404).json({ error: "Vaccination details not found" });
    }

    return res.status(200).json({ message: "Vaccination Details removed" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error while deleting account", message: err.message });
  }
});

// Get Vaccinarion Histroy of Child
router.get("/vacc-history/:babyId", async (req, res) => {
  const bid = req.params.babyId;

  try {
    const vaccinations = await vaccinationSchema.find({ bid });

    if (!vaccinations) {
      return res.status(404).json({ error: "No vaccination history found" });
    }

    return res.status(200).json(vaccinations);
  } catch (err) {
    return res.status(500).json({
      error: "Error while fetching vaccinations",
      message: err.message,
    });
  }
});


module.exports = router; // Export the router instance
