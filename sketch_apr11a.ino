// Define analog input pins
const int tdsPin = A0;
const int turbidityPin = A1;

void setup() {
  Serial.begin(9600);
  delay(2000); // Give time for Serial to connect
}

void loop() {
  int tdsValue = analogRead(tdsPin);
  int turbidityValue = analogRead(turbidityPin);

  // Convert raw analog values to meaningful units
  float tds_ppm = map(tdsValue, 0, 484, 0, 1000);
  float turbidity_ntu = map(turbidityValue, 9, 750, 100, 0);

  // Print in JSON format for easy parsing
  Serial.print("{\"tds\": ");
  Serial.print(tds_ppm);
  Serial.print(", \"turbidity\": ");
  Serial.print(turbidity_ntu);
  Serial.println("}");

  delay(3000); // Delay before next reading
}
