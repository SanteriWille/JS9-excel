var input = document.getElementById('input')
input.addEventListener('change', function () {
  readXlsxFile(input.files[0]).then(function (array) {

    const headers = array[0];
    const getCol = (colName) => headers.indexOf(colName);

    const cols = {
      department: getCol('Department'),
      gender: getCol('Gender'),
      salary: getCol('Annual Salary'),
      hireDate: getCol('Hire Date'),
      exitDate: getCol('Exit Date'),
      age: getCol('Age'),
      fullName: getCol('Full Name')
    };

    //oppgave 1
    let femaleCount = 0;
    array.forEach(row => {
      if (row[3] && row[5] && row[3].toLowerCase() === 'it' && row[5].toLowerCase() === 'female') {
        femaleCount++
      }
    });
    console.log('Det er så mange kvinner som jobber i IT-bransjen:', femaleCount);

    //oppgave 2
    let avdelinger = [];
    array.forEach(row => {
      if((avdelinger.indexOf(row[3])) == -1) {
        avdelinger.push(row[3])
      } 
      if (avdelinger[0].toLowerCase() === 'department') {
        avdelinger.shift();
      }

    });
    console.log(avdelinger);

    //oppgave 3
    let maleCount = 0;
    array.forEach(row => {
      if (row[5] && row[5].toLowerCase() === 'male') {
        maleCount++
        }
      });

      let femaleCount2 = 0;
      array.forEach(row => {
        if (row[5] && row[5].toLowerCase() === 'female') {
          femaleCount2++
        }
      });

      if (femaleCount2 > maleCount) {
        console.log("Det er flere kvinner enn menn", femaleCount2, ">", maleCount);
      } else {
        console.log("Det er flere menn enn kvinner");
      }

    //oppgave 4
    let ageCheck = []
    array.forEach(row => {
      ageCheck.push(row[6])

    });
    ageCheck.shift()
    console.log(`De yngste ansatte er ${Math.min(...ageCheck)} år gammel`);

    //oppgave 5
    let payCheck = [];
    array.forEach(row => {
      payCheck.push(row[8])

    });
    payCheck.shift();
    var hL = Math.max(...payCheck);

    array.forEach(element => {
      if (element[8] == hL) {
        console.log(`Han er i "${element[3]}" avdelingen`);
      }
    });

    //oppgave 6
    let date = [];
    array.forEach(element => {
      date.push(new Date(element[7]).getTime())
    });
    date.shift()

    var eD = Math.min(...date)

    array.forEach(element => {
      if (new Date(element[7]).getTime() === eD) {
        console.log(`Første ansatte i selskapet er "${element[1]}"`);
      }
    });

    //oppgave 7
    let resignedIn2019 = 0;
    array.forEach(element => {
      let year = new Date(element[12]).getFullYear();
      if (year === 2019) {
        resignedIn2019++;
      }
    });
    console.log(`Det var "${resignedIn2019}" som sa opp jobben i 2019`);

    //oppgave 8
    let exitDate = [];
    array.forEach(element => {
      exitDate.push(new Date(element[12]).getTime())
    });
    exitDate.shift()

    var exD = Math.max(...exitDate)

    array.forEach(element => {
      if (new Date(element[12]).getTime() === exD) {
        console.log(`Siste ansatt som har sluttet er "${element[1]}"`);
      }
    });

    //oppgave 9
    const nameCounts = array.reduce((acc, row) => {
      acc[row[cols.fullName]] = (acc[row[cols.fullName]] || 0) + 1;
      return acc;
    }, {});

    const sameNameEmployees = Object.keys(nameCounts).filter(name => nameCounts[name] > 1);
    console.log('Ansatte med samme navn:', sameNameEmployees);

  });
});