// Typed component ports.
//
// A connection is only meaningful if both ends agree about what kind of signal
// crosses it. Declaring ports lets the compiler reject a board that wires a
// periodic interrupt to something that is not an interrupt input, instead of
// emitting it and letting the runtime ignore it.
export {};
