import React, { useEffect, useState } from "react";
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import CategoryDropdown from "../component/KategoriDropdown";
import WalletTypeDropdown from "../component/WalletDropdown";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';




const AddOutcome = () => {
    const [username, setUsername] = useState('');
    const [userOutcomes, setUserOutcomes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedWalletId, setSelectedWalletId] = useState('');

    const [newOutcome, setNewOutcome] = useState({
        id_wallet: 0,
        amount: 0,
        time_stamp: "",
        id_kategori: 0,
    });
    

    useEffect(() => {
        // Fetch outcomes from the API
        const storedUsername = Cookies.get('username')
        if (storedUsername) {
            setUsername(storedUsername)
        }
      
        axios.get(`http://localhost:5000/outcome/per/${storedUsername}`)
        .then((response) => {
            console.log(response.data)
            setUserOutcomes(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching outcomes:', error);
            setLoading(false);
        });

      }, []);
      

      if (loading) {
        return <p>Loading...</p>;
      }

    const loadOutcome = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/outcome/per/${username}`);
            setUserOutcomes(result.data);
            setLoading(false);
            console.log(result.data);
        } catch (error) {
            console.error("Error loading outcome data:", error);
            
        }
    }

    const AddNewOutcome = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            // Send a POST request to add the new income data
            newOutcome.amount = parseInt(newOutcome.amount);
            newOutcome.id_wallet = parseInt(selectedWalletId);
            const isoDateString = formatDateToISOString(newOutcome.time_stamp);
            console.log(isoDateString);
            newOutcome.time_stamp = isoDateString
            newOutcome.id_kategori = parseInt(selectedCategory);
            console.log(newOutcome);
            const data = await axios.post("http://localhost:5000/outcome", newOutcome, { validateStatus: false });

            if (data.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Income Added!',
                    text: data.data.msg,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Income Failed!',
                    text: data.data.msg,
                });
            }

            // Reload the income data after adding
            loadOutcome();

            // Clear the input fields
            setNewOutcome({ id_wallet: 0, amount: 0, time_stamp: "" , id_kategori: 0});
        } catch (error) {
            console.error("Error adding outcome:", error);
        }
    };

    const formatDateToISOString = (dateString) => {
        if (!dateString) {
            return "";
        }
    
        const parts = dateString.split("-");
        if (parts.length !== 3) {
            return "";
        }
    
        const year = parts[0];
        const month = parts[1];
        const day = parts[2];
    
        // Create a new Date object with the given year, month, and day
        const dateObject = new Date(year, month - 1, day);
    
        // Use the toISOString() method to get the ISO-8601 formatted string
        return dateObject.toISOString();
    };

    const sortedOutcomes = userOutcomes.slice().sort((a, b) => {
        const dateA = a.time_stamp ? new Date(a.time_stamp) : null;
        const dateB = b.time_stamp ? new Date(b.time_stamp) : null;
    
        if (dateA && dateB) {
            return dateA - dateB;
        }
    
        // Handle cases where dateA or dateB is null (N/A)
        if (dateA) {
            return -1;
        }
        if (dateB) {
            return 1;
        }
    
        return 0;
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOutcome({ ...newOutcome, [name]: value });
    };

    const handleWalletChange = (value) => {
        setSelectedWalletId(value);
      };

      const handleKategoriChange = (value) => {
        setSelectedCategory(value);
      };

    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid">
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Outcome</h1>
                            <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                <i className="fas fa-download fa-sm text-white-50"></i> Generate Report
                            </a>
                        </div>
                        <div className="container-fluid">
                            <div className="card shadow mb-4 mt-5">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary text-center">OUTCOME</h6>
                                </div>
                                <div className="card-body">
                                    <button type="button" className="btn btn-primary mb-4" data-toggle="modal" data-target="#addoutcomemodal">Add Outcome</button>
                                    <div className="table-responsive">
                                        <table className="table table-bordered text-center" id="dataTable">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Wallet</th>
                                                    <th>Category</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {sortedOutcomes.map((outcome) => {
                                                const walletType = outcome.wallet ? outcome.wallet.tipe : 'N/A';
                                                const amount = outcome.amount ? parseFloat(outcome.amount).toLocaleString('de-DE', { minimumFractionDigits: 2 }) : 'N/A';

                                                const date = outcome.time_stamp ? new Date(outcome.time_stamp) : null;
                                                const formattedDate = date ? date.toLocaleDateString('en-UK') : 'N/A';

                                                const categoryName = outcome.kategori ? outcome.kategori.nama_kategori : 'N/A';

                                                return (
                                                    <tr key={outcome.id_outcome}>
                                                        <td>{formattedDate}</td>
                                                        <td>{walletType}</td>
                                                        <td>{categoryName}</td>
                                                        <td style={{ textAlign: 'right' }}>{amount}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>


                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* add income Modal*/}
            <div className="modal fade" id="addoutcomemodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add income</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">                            
                        <form onSubmit={AddNewOutcome}>
                            <CategoryDropdown onKategoriChange={handleKategoriChange}/>
                            <WalletTypeDropdown onWalletChange={handleWalletChange}/>
                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="amount"
                                    name="amount"
                                    value={newOutcome.amount}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="time_stamp">Time Stamp</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="time_stamp"
                                    name="time_stamp"
                                    value={newOutcome.time_stamp}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary m-1">Submit</button>
                            <button className="btn btn-secondary m-1 " type="button" data-dismiss="modal">Cancel</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddOutcome;
