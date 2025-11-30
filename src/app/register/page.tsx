'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/shared/logo';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useAuth,
  useUser,
  initiateEmailSignUp,
  setDocumentNonBlocking,
} from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { onAuthStateChanged, type FirebaseError } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';


export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleRegisterError = (error: FirebaseError) => {
    let title = 'Registration Failed';
    let description = 'An unexpected error occurred. Please try again.';

    if (error.code === 'auth/email-already-in-use') {
      description = 'This email is already registered. Please log in instead.';
    } else if (error.code === 'auth/weak-password') {
      description = 'The password is too weak. Please choose a stronger password.';
    }
    
    toast({
      variant: 'destructive',
      title,
      description,
    });
  }

  const handleRegister = () => {
    if (password !== confirmPassword) {
       toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: 'Passwords do not match.',
      });
      return;
    }
    initiateEmailSignUp(auth, email, password, handleRegisterError);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      if (newUser && fullName) {
        const [firstName, ...lastName] = fullName.split(' ');
        const userRef = doc(firestore, 'users', newUser.uid);
        getDoc(userRef).then((docSnap) => {
          if (!docSnap.exists()) {
            setDocumentNonBlocking(
              userRef,
              {
                id: newUser.uid,
                firstName: firstName,
                lastName: lastName.join(' '),
                email: newUser.email,
              },
              { merge: true }
            );
          }
        });
      }
    });

    return () => unsubscribe();
  }, [auth, firestore, fullName]);


  if (isUserLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-background p-4"><p>Loading...</p></div>
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">
              Create an Account
            </CardTitle>
            <CardDescription>
              Join us to start planning your perfect event.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input
                id="full-name"
                placeholder="John Doe"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              className="w-full text-lg py-6"
              onClick={handleRegister}
            >
              Register
            </Button>
            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
