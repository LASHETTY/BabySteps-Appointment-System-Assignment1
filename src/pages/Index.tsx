
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CalendarDays, Clock, Users } from "lucide-react";

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Obstetrics",
    availability: "Mon-Fri",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Gynecology",
    availability: "Mon-Thu",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Dr. Emily Martinez",
    specialization: "Maternal-Fetal Medicine",
    availability: "Tue-Sat",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&h=200&auto=format&fit=crop",
  },
];

const Index = () => {
  const { toast } = useToast();
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
    toast({
      title: "Doctor Selected",
      description: `You've selected ${doctor.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-baby-cream to-white px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-baby-pink text-primary-foreground text-sm font-medium">
            Prenatal Care Scheduling
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Find Your Perfect Care Provider</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book appointments with our experienced prenatal care specialists. We're here to support you throughout your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {mockDoctors.map((doctor) => (
            <Card 
              key={doctor.id}
              className="overflow-hidden card-hover bg-white"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{doctor.specialization}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    <span>Available {doctor.availability}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>30-60 min sessions</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Accepting new patients</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-baby-mint text-secondary-foreground hover:bg-secondary smooth-transition"
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  Book Appointment
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
