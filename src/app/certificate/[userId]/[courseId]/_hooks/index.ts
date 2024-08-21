import { Contract, ethers } from 'ethers';
import { useEffect, useState } from 'react';

import { useToast } from '@/components/ui/use-toast';

import { abi } from '@/abi/contract.json';

const CONTRACT_ADDRESS = '0x6CAe432354A436fd826f03E258aD84F83f84a7F8';

type Certificate = {
  userId: string;
  courseId: string;
  completedPoint: number;
  timestamp: Date;
};

export const useCertificate = (userId: string, courseId: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Certificate>();
  const { toast } = useToast();
  useEffect(() => {
    const getCertificateInfor = async () => {
      try {
        if (window.ethereum) {
          setLoading(true);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
          const certificate = await contract.getResultByUserIdAndCourseId(
            userId,
            courseId
          );
          const formatCertificate = {
            userId: certificate[0],
            courseId: certificate[1],
            completedPoint: ethers.toNumber(certificate[2]),
            timestamp: new Date(Number(certificate[3]) * 1000),
          };
          setData(formatCertificate);
        }
      } catch (error) {
        setError(true);
        toast({ variant: 'destructive', title: 'Something went wrong!' });
      } finally {
        setLoading(false);
      }
    };
    getCertificateInfor();
  }, [courseId, toast, userId]);
  return { loading, error, data };
};
