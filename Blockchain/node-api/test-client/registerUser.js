const fabricCAService = require("fabric-ca-client");
const { Wallets } = require("fabric-network");
const yaml = require("js-yaml");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const walletPath = "./wallet";
// const ccp = yaml.safeLoad(fs.readFileSync('./connection.yaml'))
// const  caConfig = ccp.certificateAuthorities[ccp.organizations.Peepaltree.certificateAuthorities[0]]

const registerUser = async (clientType, patientId) => {
  try {
    const clientName = clientType + "-" + patientId;
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const admin = await wallet.get("admin");
    if (!admin) {
      // console.log("Admin is not enrolled");
      return;
    }
    client = await wallet.get(clientName);
    if (client) {
      console.log(`${clientName} already exists`);
      return;
    }
    const ca = new fabricCAService("http://localhost:7054");
    const provider = wallet.getProviderRegistry().getProvider(admin.type);
    const adminUser = await provider.getUserContext(admin, "admin");

    await ca.register(
      { enrollmentID: clientName, role: "client", enrollmentSecret: "pw" },
      adminUser
    );
    console.log(`${clientName} has been registered`);

    const enrollment = await ca.enroll({
      enrollmentID: clientName,
      enrollmentSecret: "pw",
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: "DevMSP",
      type: "X.509",
      client: clientName,
    };
    await wallet.put(clientName, x509Identity);
    console.log(
      `Successfully enrolled user ${clientName} and imported it into the wallet`
    );
    return x509Identity;
  } catch (error) {
    console.log(error);
  }
};

module.exports = registerUser;
