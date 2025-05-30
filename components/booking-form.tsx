"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Clock, CreditCard, Shield } from "lucide-react";

interface BookingFormProps {
  appointmentType: string;
  selectedDate: Date;
  selectedTime: string;
  onSubmit: (formData: any) => void;
  isSubmitting: boolean;
}

const appointmentTypeNames: Record<string, string> = {
  "initial-consultation": "Initial Consultation",
  "follow-up": "Follow-up Session",
  "meal-planning": "Meal Planning Session",
  "group-session": "Group Workshop",
  "sports-nutrition": "Sports Nutrition",
  "educational-session": "Nutrition Education",
};

const appointmentTypePrices: Record<string, string> = {
  "initial-consultation": "$150",
  "follow-up": "$75",
  "meal-planning": "$100",
  "group-session": "$50",
  "sports-nutrition": "$125",
  "educational-session": "$85",
};

export function BookingForm({
  appointmentType,
  selectedDate,
  selectedTime,
  onSubmit,
  isSubmitting,
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    emergencyContact: "",
    emergencyPhone: "",
    healthGoals: "",
    dietaryRestrictions: "",
    allergies: "",
    medications: "",
    medicalConditions: "",
    activityLevel: "",
    previousNutrition: "",
    referralSource: "",
    specialRequests: "",
    paymentMethod: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
    marketingConsent: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      appointmentType,
      selectedDate,
      selectedTime,
    });
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.healthGoals &&
      formData.paymentMethod &&
      formData.agreeToTerms &&
      formData.agreeToPrivacy
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Booking Summary */}
      <Card className="border-sage-100 bg-sage-50/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-sage-600" />
            <span>Booking Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Service
              </Label>
              <p className="text-sm text-gray-900 mt-1">
                {appointmentTypeNames[appointmentType]}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Date & Time
              </Label>
              <p className="text-sm text-gray-900 mt-1">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm text-sage-600 flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{selectedTime}</span>
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Price</Label>
              <p className="text-lg font-bold text-sage-600 mt-1">
                {appointmentTypePrices[appointmentType]}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="border-sage-100">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <User className="h-5 w-5 text-sage-600" />
            <span>Personal Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="border-sage-200 focus:border-sage-400"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="border-sage-200 focus:border-sage-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="border-sage-200 focus:border-sage-400"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="border-sage-200 focus:border-sage-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
                className="border-sage-200 focus:border-sage-400"
              />
            </div>
            <div>
              <Label>Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
              >
                <SelectTrigger className="border-sage-200 focus:border-sage-400">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="prefer-not-to-say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) =>
                  handleInputChange("emergencyContact", e.target.value)
                }
                className="border-sage-200 focus:border-sage-400"
              />
            </div>
            <div>
              <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
              <Input
                id="emergencyPhone"
                type="tel"
                value={formData.emergencyPhone}
                onChange={(e) =>
                  handleInputChange("emergencyPhone", e.target.value)
                }
                className="border-sage-200 focus:border-sage-400"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Information */}
      <Card className="border-sage-100">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Health & Wellness Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="healthGoals">Primary Health Goals *</Label>
            <Textarea
              id="healthGoals"
              value={formData.healthGoals}
              onChange={(e) => handleInputChange("healthGoals", e.target.value)}
              placeholder="Please describe your main health and nutrition goals..."
              className="border-sage-200 focus:border-sage-400"
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
            <Textarea
              id="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={(e) =>
                handleInputChange("dietaryRestrictions", e.target.value)
              }
              placeholder="Any dietary restrictions, preferences, or eating patterns..."
              className="border-sage-200 focus:border-sage-400"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="allergies">Food Allergies</Label>
              <Input
                id="allergies"
                value={formData.allergies}
                onChange={(e) => handleInputChange("allergies", e.target.value)}
                placeholder="List any food allergies..."
                className="border-sage-200 focus:border-sage-400"
              />
            </div>
            <div>
              <Label htmlFor="medications">Current Medications</Label>
              <Input
                id="medications"
                value={formData.medications}
                onChange={(e) =>
                  handleInputChange("medications", e.target.value)
                }
                placeholder="List current medications..."
                className="border-sage-200 focus:border-sage-400"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="medicalConditions">Medical Conditions</Label>
            <Textarea
              id="medicalConditions"
              value={formData.medicalConditions}
              onChange={(e) =>
                handleInputChange("medicalConditions", e.target.value)
              }
              placeholder="Any relevant medical conditions or health concerns..."
              className="border-sage-200 focus:border-sage-400"
              rows={2}
            />
          </div>

          <div>
            <Label>Activity Level</Label>
            <RadioGroup
              value={formData.activityLevel}
              onValueChange={(value) =>
                handleInputChange("activityLevel", value)
              }
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sedentary" id="sedentary" />
                <Label htmlFor="sedentary">
                  Sedentary (little to no exercise)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">Light activity (1-3 days/week)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="moderate" id="moderate" />
                <Label htmlFor="moderate">
                  Moderate activity (3-5 days/week)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active" id="active" />
                <Label htmlFor="active">Very active (6-7 days/week)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="extra" id="extra" />
                <Label htmlFor="extra">
                  Extra active (2x/day, intense workouts)
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card className="border-sage-100">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Additional Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="previousNutrition">
              Previous Nutrition Experience
            </Label>
            <Textarea
              id="previousNutrition"
              value={formData.previousNutrition}
              onChange={(e) =>
                handleInputChange("previousNutrition", e.target.value)
              }
              placeholder="Have you worked with a nutritionist before? Any previous diet programs?"
              className="border-sage-200 focus:border-sage-400"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="referralSource">How did you hear about us?</Label>
            <Select
              value={formData.referralSource}
              onValueChange={(value) =>
                handleInputChange("referralSource", value)
              }
            >
              <SelectTrigger className="border-sage-200 focus:border-sage-400">
                <SelectValue placeholder="Select referral source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google">Google Search</SelectItem>
                <SelectItem value="social-media">Social Media</SelectItem>
                <SelectItem value="friend-family">
                  Friend/Family Referral
                </SelectItem>
                <SelectItem value="doctor">Doctor Referral</SelectItem>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="specialRequests">
              Special Requests or Questions
            </Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) =>
                handleInputChange("specialRequests", e.target.value)
              }
              placeholder="Any special accommodations or questions for your appointment..."
              className="border-sage-200 focus:border-sage-400"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card className="border-sage-100">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-sage-600" />
            <span>Payment Method *</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={(value) => handleInputChange("paymentMethod", value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 p-3 border border-sage-200 rounded-lg">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex-1">
                Credit/Debit Card
              </Label>
              <Badge variant="outline" className="text-xs">
                Secure
              </Badge>
            </div>
            <div className="flex items-center space-x-2 p-3 border border-sage-200 rounded-lg">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal" className="flex-1">
                PayPal
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border border-sage-200 rounded-lg">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="flex-1">
                Pay at Appointment
              </Label>
            </div>
          </RadioGroup>

          <div className="mt-4 p-3 bg-sage-50 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-sage-700">
              <Shield className="h-4 w-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card className="border-sage-100">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) =>
                handleInputChange("agreeToTerms", checked as boolean)
              }
              className="border-sage-300 data-[state=checked]:bg-sage-500"
            />
            <Label htmlFor="terms" className="text-sm leading-relaxed">
              I agree to the{" "}
              <a href="#" className="text-sage-600 hover:underline">
                Terms of Service
              </a>{" "}
              and understand the cancellation policy *
            </Label>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="privacy"
              checked={formData.agreeToPrivacy}
              onCheckedChange={(checked) =>
                handleInputChange("agreeToPrivacy", checked as boolean)
              }
              className="border-sage-300 data-[state=checked]:bg-sage-500"
            />
            <Label htmlFor="privacy" className="text-sm leading-relaxed">
              I agree to the{" "}
              <a href="#" className="text-sage-600 hover:underline">
                Privacy Policy
              </a>{" "}
              and consent to the collection and use of my health information *
            </Label>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="marketing"
              checked={formData.marketingConsent}
              onCheckedChange={(checked) =>
                handleInputChange("marketingConsent", checked as boolean)
              }
              className="border-sage-300 data-[state=checked]:bg-sage-500"
            />
            <Label htmlFor="marketing" className="text-sm leading-relaxed">
              I would like to receive nutrition tips, updates, and promotional
              emails (optional)
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={!isFormValid() || isSubmitting}
          className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white px-12 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? "Booking Appointment..."
            : `Book Appointment - ${appointmentTypePrices[appointmentType]}`}
        </Button>
      </div>
    </form>
  );
}
