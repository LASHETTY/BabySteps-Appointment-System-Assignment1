
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft, Clock } from "lucide-react";

type Doctor = {
  id: number;
  name: string;
  specialization: string;
  availability: string;
  image: string;
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

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Select Date</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              disabled={(date) => {
                const day = date.getDay();
                // Disable weekends and past dates
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
      </div>
    </div>
  );
};

export default Booking;
