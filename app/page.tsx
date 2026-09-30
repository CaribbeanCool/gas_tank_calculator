"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

// Car models with tank capacities in liters
const carModels = [
  { name: "Nissan Altima 2010 2.5L", capacity: 75.7 },
  { name: "Mazda Tribute 2002", capacity: 62.08 },
  { name: "Ford Ranger 2002", capacity: 62.459 },
  { name: "Toyota Echo 2000", capacity: 45.046 },
  { name: "Mitsubishi Lancer 2010", capacity: 58.67 },
];

export default function GasTankCalculator() {
  const [selectedCar, setSelectedCar] = useState<string>("");
  const [currentFuelLevel, setCurrentFuelLevel] = useState<number[]>([25]);
  const [pricePerLiter, setPricePerLiter] = useState<string>("0.77");

  const selectedCarData = carModels.find((car) => car.name === selectedCar);
  const tankCapacity = selectedCarData?.capacity || 0;
  const currentFuelPercentage = currentFuelLevel[0];
  const currentFuelAmount = (tankCapacity * currentFuelPercentage) / 100;
  const litersNeeded = tankCapacity - currentFuelAmount;
  const totalCost = litersNeeded * Number.parseFloat(pricePerLiter || "0");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Calculadora de Gasolina
          </h1>
          <p className="text-gray-600">
            Calcula cuanta gasolina necesitas para llenar tu tanque y cuánto
            costará
          </p>
        </div>

        {/* Main Calculator Card */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-800">
              Calculadora de Gasolina
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Car Selection */}
            <div className="space-y-2">
              <Label htmlFor="car-select" className="text-sm font-medium">
                Selecciona tu modelo de carro
              </Label>
              <Select value={selectedCar} onValueChange={setSelectedCar}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Escoge tu modelo de carro" />
                </SelectTrigger>
                <SelectContent>
                  {carModels.map((car) => (
                    <SelectItem key={car.name} value={car.name}>
                      {car.name} ({car.capacity}L)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCar && (
              <>
                <div className="space-y-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <Label htmlFor="fuel-level" className="text-sm font-medium">
                        ¿Cuánta gasolina tienes ahora?
                      </Label>
                      <p className="text-sm text-gray-500">
                        Ajusta el nivel estimado del tanque
                      </p>
                    </div>
                    <div className="relative w-24 shrink-0">
                      <Input
                        id="fuel-level"
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={currentFuelPercentage}
                        onChange={(event) => {
                          const value = Math.min(
                            100,
                            Math.max(0, Number.parseInt(event.target.value || "0", 10)),
                          );
                          setCurrentFuelLevel([value]);
                        }}
                        aria-label="Porcentaje actual de gasolina"
                        className="pr-7 text-right font-semibold"
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                        %
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative w-48 h-48">
                      {/* Background circle */}
                      <div className="absolute inset-0 rounded-full bg-gray-200">
                        {/* Fuel level circle */}
                        <div
                          className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-300"
                          style={{
                            clipPath: `inset(${
                              100 - currentFuelPercentage
                            }% 0 0 0)`,
                          }}
                        />
                        {/* Center circle with percentage */}
                        <div className="absolute inset-8 rounded-full bg-white shadow-inner flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-800">
                              {currentFuelPercentage}%
                            </div>
                            <div className="text-sm text-gray-600">
                              Nivel de Gasolina
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fuel Level Slider */}
                  <div className="px-2">
                    <Slider
                      value={currentFuelLevel}
                      onValueChange={setCurrentFuelLevel}
                      max={100}
                      min={0}
                      step={1}
                      aria-label="Nivel actual de gasolina"
                      className="w-full"
                    />
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>Vacío</span>
                      <span>Lleno</span>
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-2" aria-label="Niveles rápidos">
                      {[25, 50, 75, 100].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setCurrentFuelLevel([level])}
                          aria-pressed={currentFuelPercentage === level}
                          className={`rounded-lg border px-2 py-2 text-sm font-medium transition-colors ${
                            currentFuelPercentage === level
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                        >
                          {level}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price Input */}
                <div className="space-y-2">
                  <Label htmlFor="price-input" className="text-sm font-medium">
                    Precio por Litro ($)
                  </Label>
                  <Input
                    id="price-input"
                    type="number"
                    step="0.01"
                    min="0"
                    value={pricePerLiter}
                    onChange={(e) => setPricePerLiter(e.target.value)}
                    placeholder="Escriba el precio por litro"
                    className="text-lg"
                  />
                </div>

                {/* Results */}
                {pricePerLiter && Number.parseFloat(pricePerLiter) > 0 && (
                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="pt-6">
                      <div className="text-center space-y-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Calculo de Gasolina
                        </h3>
                        <div className="text-2xl font-bold text-green-700">
                          Se necesita {litersNeeded.toFixed(1)}L, con un costo
                          de ${totalCost.toFixed(2)} para llenar el tanque.
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                          <div className="bg-white/50 rounded-lg p-3">
                            <div className="font-medium">Litros necesarios</div>
                            <div className="text-lg font-bold text-blue-600">
                              {litersNeeded.toFixed(1)}L
                            </div>
                          </div>
                          <div className="bg-white/50 rounded-lg p-3">
                            <div className="font-medium">Costo Total</div>
                            <div className="text-lg font-bold text-green-600">
                              ${totalCost.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          Built with React & TailwindCSS • Ready for Vercel deployment
        </div>
      </div>
    </div>
  );
}
