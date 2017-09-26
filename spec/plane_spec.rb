require_relative 'spec_helper'

describe Plane do

  describe "temperature_calculations" do
    before do
      @plane = Plane.new
    end

    it "convert into 32 farenheit" do
      @plane.convert.must_equal 32
    end
  end

  describe "true_airspeed" do
    before do
      @plane = Plane.new
    end

    it "calculates the true airspeed as 13 knots" do
      @plane.true_airspeed.must_equal 13
    end
  end

  # describe "Wind direction" do
  #   before do
  #     @runway_heading_degrees = 30
  #     @wind_direction_degress = 9
  #     @wind_speed_knots = 10
  #   end

  #   it "should calculate the crosswind as 4" do
  #     skip "Design and Implement me! (and delete this line)"
  #   end

  #   it "should calculate the headwind as 9" do
  #     skip "Design and Implement me! (and delete this line)"
  #   end
  # end
end