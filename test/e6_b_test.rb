require 'minitest/autorun'

class E6BTest < MiniTest::Test

  describe "Fuel Calculations" do
    describe "Fuel Consumption" do
      before do
        @total_gallons_burned = 50
        @hours = 7
        @minutes = 10
      end

      it "should calculate the gallons per hour as 6.98" do
        skip "Design and Implement me! (and delete this line)"
      end
    end

    describe "Flight Time Left" do
      before do
        @gallons_burned_per_hour = 15
        @gallons_left = 60
      end

      it "should calculate the total time the aircraft can fly as 4 hours" do
        skip "Design and Implement me! (and delete this line)"
      end
    end
  end

  describe "Speed / Distance calculations" do
    describe "True Airspeed" do
      before do
        @altitude = 7000
        @air_pressure_hectopascals = 1013.25
        @air_speed_knots = 60
      end

      it "should calculate the true airspeed as 68.38" do
        skip "Design and Implement me! (and delete this line)"
      end
    end

    describe "Wind direction" do
      before do
        @runway_heading_degrees = 30
        @wind_direction_degress = 9
      end

      it "should calculate the left/x wind as 14" do
        skip "Design and Implement me! (and delete this line)"
      end

      it "should calculate the headwind as 35" do
        skip "Design and Implement me! (and delete this line)"
      end
    end
  end

end