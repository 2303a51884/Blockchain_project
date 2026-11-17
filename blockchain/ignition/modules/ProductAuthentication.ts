
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ProductAuthenticationModule", (m) => {
    const productAuthentication = m.contract("ProductAuthentication");

    return { productAuthentication };
});
