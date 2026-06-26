export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl: string;
  skills: string[];
}

export const certifications: Certification[] = [
  {
    name: "Oracle Certified Associate: Java SE Programmer",
    issuer: "Oracle",
    date: "2024",
    credentialId: "OCA-JAVA-12093",
    verificationUrl: "https://oracle.com/verify",
    skills: ["Java SE", "OOPs", "Algorithms"]
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: "2025",
    credentialId: "AWS-CCP-87421",
    verificationUrl: "https://aws.amazon.com/verification",
    skills: ["Cloud Computing", "S3", "EC2", "IAM"]
  },
  {
    name: "Spring Certified Professional",
    issuer: "VMware",
    date: "2025",
    credentialId: "SPRING-CP-49210",
    verificationUrl: "https://vmware.com/verify",
    skills: ["Spring Boot", "Spring Security", "JPA"]
  }
];
