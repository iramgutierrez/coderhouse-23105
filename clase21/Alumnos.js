
class Alumnos {
    constructor (db) {
        this.db = db
    }

    listarAlumnos () {
        const alumnos = this.db.get()

        if (!alumnos) {
            return new Error('No hay alumnos')
        }

        /**
         [
             {
                 id: 1,
                 name: 'Andres'
             }
         ]
         
         */

        const nombres = alumnos.map(alumno => alumno.name)

        /**
         
        [
            'Andres',
            'Ariel',
            'Baltasar'
        ]
         */

        return nombres.join(', ')

        // 'Andres, Ariel, 'Baltasar'
    }
}

module.exports = Alumnos