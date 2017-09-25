require './lib/flight'
require './lib/duration'
require './lib/airport'

ba_12345 = Flight.new(
  :number => 'BA-12345',
  :airline => 'British Airways',
  :from => "LHR",
  :from_lat => 51.4700223,
  :from_lng => -0.4542955,
  :to => "JFK",
  :to_lat => 40.6413111,
  :to_lng => -73.77813909999999,
  :departure => Time.utc(2014, 11, 1, 14, 47),
  :speed_kph => 790,
  :bearing => 3,
  :aircraft => "Boeing 747"
)

puts ba_12345


