
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Clock } from "lucide-react";

type Doctor = {
  id: number;
  name: string;
  specialization: string;
  availability: string;
  image: string;
};

type PatientInfo = {
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const doctor = location.state?.doctor as Doctor;
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  if (!doctor) {
    navigate("/");
    return null;
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    toast({
      title: "Time Selected",
      description: `You've selected ${time} on ${selectedDate?.toLocaleDateString()}`,
    });
  };

  const handlePatientInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPatientInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Error",
        description: "Please select a date and time for your appointment",
        variant: "destructive",
      });
      return;
    }

    // Here we would typically make an API call to save the appointment
    // For now, we'll just show a success message
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with Dr. ${doctor.name} has been scheduled for ${selectedDate.toLocaleDateString()} at ${selectedTime}`,
    });

    // Navigate back to home page after successful booking
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-baby-cream to-white px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Doctors
        </Button>

        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold">{doctor.name}</h2>
              <p className="text-gray-600">{doctor.specialization}</p>
            </div>
          </div>
        </Card>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Select Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => {
                  const day = date.getDay();
                  return (
                    day === 0 ||
                    day === 6 ||
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  );
                }}
              />
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Select Time</h3>
              {selectedDate ? (
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => handleTimeSelect(time)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Please select a date first</p>
              )}
            </Card>
          </div>

          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Patient Information</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={patientInfo.name}
                  onChange={handlePatientInfoChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={patientInfo.email}
                  onChange={handlePatientInfoChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={patientInfo.phone}
                  onChange={handlePatientInfoChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={patientInfo.notes}
                  onChange={handlePatientInfoChange}
                  placeholder="Any special requirements or conditions..."
                />
              </div>
            </div>
          </Card>

          <Button type="submit" className="w-full md:w-auto">
            Confirm Booking
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
